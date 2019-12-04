import { Contract, Predicates, isObject, ModuleName } from '@boost/common';
import { createDebugger, Debugger } from '@boost/debug';
import { RuntimeError, color } from '@boost/internal';
import pluralize from 'pluralize';
import kebabCase from 'lodash/kebabCase';
import Loader from './Loader';
import { ManagerOptions, Pluggable, Container, Setting, PluginOptions } from './types';
import { DEFAULT_PRIORITY, MODULE_NAME_PATTERN } from './constants';

export default class Manager<Plugin extends Pluggable, Tool = unknown> extends Contract<
  ManagerOptions<Plugin>
> {
  readonly debug: Debugger;

  readonly pluralName: string;

  readonly projectName: string;

  readonly singularName: string;

  private loader: Loader<Plugin>;

  private plugins: Container<Plugin>[] = [];

  constructor(projectName: string, typeName: string, options: ManagerOptions<Plugin>) {
    super(options);

    this.projectName = kebabCase(projectName);
    this.singularName = kebabCase(typeName);
    this.pluralName = pluralize(this.singularName);
    this.debug = createDebugger([this.singularName, 'manager']);
    this.loader = new Loader(this);

    this.debug('Creating new plugin type: %s', color.pluginName(typeName));
  }

  blueprint({ func }: Predicates) {
    return {
      afterShutdown: func(),
      afterStartup: func(),
      beforeShutdown: func(),
      beforeStartup: func(),
      validate: func()
        .notNullable()
        .required(),
    };
  }

  /**
   * Format a name into a fully qualified and compatible Node/NPM module name,
   * with the tool and type names being used as scopes and prefixes.
   */
  formatModuleName(name: string, scoped: boolean = false): ModuleName {
    if (scoped) {
      return `@${this.projectName}/${this.singularName}-${name.toLowerCase()}`;
    }

    return `${this.projectName}-${this.singularName}-${name.toLowerCase()}`;
  }

  /**
   * Return a single registered plugin by module name. If the plugin cannot be found,
   * an error will be thrown.
   */
  get(name: ModuleName): Plugin {
    const plugin = this.plugins.find(container => this.isMatchingName(container, name));

    if (plugin) {
      return plugin.plugin;
    }

    throw new RuntimeError('plugin', 'PG_MISSING_PLUGIN', [this.singularName, name]);
  }

  /**
   * Return all registered plugins.
   */
  getAll(): Plugin[] {
    return this.plugins.map(container => container.plugin);
  }

  /**
   * Return multiple registered plugins by module name.
   */
  getMany(names: ModuleName[]): Plugin[] {
    return names.map(name => this.get(name));
  }

  /**
   * Load and register a single plugin based on a setting. The possible setting variants are:
   *
   * - If a string, will load based on module name.
   * - If an array, the 1st item will be considered the module name,
   *    and the 2nd item an options object that will be passed to the factory function.
   * - If an object or class instance, will assume to be the plugin itself.
   */
  load(setting: Setting<Plugin>, options?: object, tool?: Tool): Plugin {
    let name: string;
    let plugin: Plugin;
    let priority: number | undefined;

    // Module name
    if (typeof setting === 'string') {
      name = setting;
      plugin = this.loader.load(setting, options);

      // Module name with options
    } else if (Array.isArray(setting)) {
      [name, , priority] = setting;
      plugin = this.loader.load(name, setting[1] || options);

      // Plugin directly
    } else if (isObject<Plugin>(setting)) {
      if (setting.name) {
        name = setting.name;
        plugin = setting;
        priority = setting.priority;
      } else {
        throw new Error('Plugin object or class instance found without a `name` property.');
      }

      // Unknown setting
    } else {
      throw new Error(`Unknown plugin setting: ${setting}`);
    }

    this.register(plugin.name || name, plugin, { priority }, tool);

    return plugin;
  }

  /**
   * Load and register multiple plugins based on a list of settings.
   */
  loadMany(settings: Setting<Plugin>[], tool?: Tool): Plugin[] {
    return settings.map(setting => this.load(setting, {}, tool));
  }

  /**
   * Return true if a plugin has been registered.
   */
  isRegistered(name: ModuleName): boolean {
    try {
      this.get(name);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Register a plugin and trigger startup with the provided tool.
   */
  register(name: ModuleName, plugin: Plugin, options?: PluginOptions, tool?: Tool): this {
    if (!name.match(MODULE_NAME_PATTERN)) {
      throw new Error(`A fully qualified module name is required for ${this.pluralName}.`);
    }

    if (!isObject(plugin)) {
      throw new TypeError(
        `Expected an object or class instance for the ${
          this.singularName
        }, found ${typeof plugin}.`,
      );
    }

    this.debug('Validating plugin "%s"', name);

    this.options.validate(plugin);

    this.debug('Registering plugin "%s" with defined tool and triggering startup', name);

    this.triggerStartup(plugin, tool);

    this.plugins.push({
      priority: DEFAULT_PRIORITY,
      ...options,
      name,
      plugin,
    });

    this.debug('Sorting by priority');

    this.plugins.sort((a, b) => a.priority! - b.priority!);

    return this;
  }

  /**
   * Unregister a plugin by name and trigger shutdown process.
   */
  unregister(name: ModuleName, tool?: Tool): this {
    const plugin = this.get(name);

    this.debug('Unregistering plugin "%s" with defined tool and triggering shutdown', name);

    this.triggerShutdown(plugin, tool);

    this.plugins = this.plugins.filter(container => !this.isMatchingName(container, name));

    return this;
  }

  /**
   * Verify a passed name matches one of many possible module name variants for this plugin.
   */
  protected isMatchingName(container: Container<Plugin>, name: string): boolean {
    const internalModule = this.formatModuleName(name, true);
    const publicModule = this.formatModuleName(name);

    return (
      container.name === internalModule ||
      container.name === publicModule ||
      container.name === name
    );
  }

  /**
   * Trigger shutdown events for the manager and plugin.
   */
  protected triggerShutdown(plugin: Plugin, tool?: Tool) {
    const { afterShutdown, beforeShutdown } = this.options;

    if (beforeShutdown) {
      beforeShutdown(plugin);
    }

    if (typeof plugin.shutdown === 'function') {
      plugin.shutdown(tool);
    }

    if (afterShutdown) {
      afterShutdown(plugin);
    }
  }

  /**
   * Trigger startup events for the manager and plugin.
   */
  protected triggerStartup(plugin: Plugin, tool?: Tool) {
    const { afterStartup, beforeStartup } = this.options;

    if (beforeStartup) {
      beforeStartup(plugin);
    }

    if (typeof plugin.startup === 'function') {
      plugin.startup(tool);
    }

    if (afterStartup) {
      afterStartup(plugin);
    }
  }
}
