/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import execa from 'execa';
import merge from 'lodash/merge';
import Task from './Task';
import isObject from './helpers/isObject';
import { STATUS_PENDING, RESTRICTED_CONFIG_KEYS } from './constants';

import type Reporter from './Reporter';
import type Tool from './Tool';
import type { Result, ResultPromise, TaskCallback } from './types';

export default class Routine<Tc: Object, Tx: Object> extends Task<Tc, Tx> {
  exit: boolean = false;

  key: string = '';

  tool: Tool<*, Reporter<Tx>>;

  constructor(key: string, title: string, defaultConfig?: Tc) {
    super(title, null, defaultConfig);

    if (!key || typeof key !== 'string') {
      throw new Error('Routine key must be a valid unique string.');

    } else if (RESTRICTED_CONFIG_KEYS.includes(key)) {
      throw new Error(`Invalid routine key "${key}". This key is reserved.`);
    }

    this.key = key;

    // We cant pass to super, so bind here
    this.action = this.execute.bind(this);

    // We also need to set it back to pending
    this.status = STATUS_PENDING;
  }

  /**
   * Called once the routine has been configured and is ready to execute.
   */
  bootstrap() {}

  /**
   * Configure the routine after it has been instantiated.
   */
  configure(parent: Routine<*, Tx>): this {
    this.context = parent.context;
    this.tool = parent.tool;

    // Monitor process
    this.tool.on('exit', () => {
      this.exit = true;
    });

    // Inherit config from parent
    const config = parent.config[this.key];

    if (isObject(config)) {
      merge(this.config, config);
    }

    // Initialize routine (this must be last!)
    this.bootstrap();

    return this;
  }

  /**
   * Execute the current routine and return a new value.
   * This method *must* be overridden in a subclass.
   */
  /* istanbul ignore next */
  execute(value: Result, context: Tx): ResultPromise {
    return value;
  }

  /**
   * Execute a command with the given arguments and pass the results through a promise.
   */
  executeCommand(command: string, args: string[], options?: Object = {}): ResultPromise {
    const stream = execa(command, args, options);

    // Push chunks to the reporter
    stream.stdout.on('data', (data) => {
      this.statusText = data;
    });

    return this.wrap(stream);
  }

  /**
   * Execute a task, a method in the current routine, or a function,
   * with the provided value.
   */
  executeTask = (value: Result, task: Task<*, Tx>): ResultPromise => (
    this.wrap(task.run(value, this.context))
  );

  /**
   * Execute subroutines in parralel with a value being passed to each subroutine.
   * A combination promise will be returned as the result.
   */
  parallelizeSubroutines(value: Result): ResultPromise {
    // $FlowIgnore Annoying to type
    return Promise.all(this.subroutines.map(routine => this.executeTask(value, routine)));
  }

  /**
   * Execute tasks in parralel with a value being passed to each task.
   * A combination promise will be returned as the result.
   */
  parallelizeTasks(value: Result): ResultPromise {
    // $FlowIgnore Annoying to type
    return Promise.all(this.subtasks.map(task => this.executeTask(value, task)));
  }

  /**
   * Add a new subroutine within this routine.
   */
  pipe(...routines: Routine<*, Tx>[]): this {
    routines.forEach((routine) => {
      if (routine instanceof Routine) {
        this.subroutines.push(routine.configure(this));

      } else {
        throw new TypeError('Routines must be an instance of `Routine`.');
      }
    });

    return this;
  }

  /**
   * Trigger processes before and after execution.
   */
  run(value: Result, context: Tx): ResultPromise {
    const { console: cli } = this.tool;

    if (this.exit) {
      throw new Error('Process has been interrupted.');
    }

    cli.startDebugGroup(this.key);

    return super.run(value, context)
      .then((result) => {
        cli.stopDebugGroup();
        cli.update();

        return result;
      })
      .catch((error) => {
        cli.stopDebugGroup();
        cli.update();

        throw error;
      });
  }

  /**
   * Execute processes in sequential order with the output of each
   * task being passed to the next promise in the chain. Utilize the
   * `accumulator` function to execute the list of processes.
   */
  serialize(
    initialValue: Result,
    items: *[],
    accumulator: (value: Result, item: *) => ResultPromise,
  ): ResultPromise {
    return items.reduce((promise: ResultPromise, item: *) => (
      promise.then(value => accumulator(value, item))
    ), Promise.resolve(initialValue));
  }

  /**
   * Execute subroutines in sequential (serial) order.
   */
  serializeSubroutines(value: Result): ResultPromise {
    return this.serialize(value, this.subroutines, this.executeTask);
  }

  /**
   * Execute tasks in sequential (serial) order.
   */
  serializeTasks(value: Result): ResultPromise {
    return this.serialize(value, this.subtasks, this.executeTask);
  }

  /**
   * Define an individual task.
   */
  task<C: Object>(title: string, action: TaskCallback<Tx>, config?: C): Task<C, Tx> {
    if (typeof action !== 'function') {
      throw new TypeError('Tasks require an executable function.');
    }

    const task = new Task(title, action.bind(this), config);

    this.subtasks.push(task);

    return task;
  }
}
