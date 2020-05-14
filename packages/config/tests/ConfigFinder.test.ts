import { vol } from 'memfs';
import { Path } from '@boost/common';
import Cache from '../src/Cache';
import ConfigFinder from '../src/ConfigFinder';
import { rootWithoutPackageJson } from './__fixtures__/common-fs';
import {
  rootConfigJS,
  rootConfigCJS,
  // rootConfigMjs,
  rootConfigJSON,
  rootConfigYAML,
  rootConfigYML,
  configFileTreeJS,
  configFileTreeJSON,
  configFileTreeCJS,
  configFileTreeYAML,
  configFileTreeYML,
  scenarioConfigsAboveRoot,
  scenarioBranchInvalidFileName,
  scenarioBranchMultipleTypes,
  scenarioBranchWithEnvs,
  overridesFromBranch,
  overridesFromBranchWithExcludes,
  invalidBranchNestedOverrides,
} from './__fixtures__/config-files-fs';
import { stubPath } from './helpers';

jest.mock('fs', () => require.requireActual('memfs').vol);

describe('ConfigFinder', () => {
  let cache: Cache;
  let finder: ConfigFinder<{ debug: boolean }>;

  beforeEach(() => {
    cache = new Cache();
    finder = new ConfigFinder(
      { extendsSetting: 'extends', name: 'boost', overridesSetting: 'overrides' },
      cache,
    );

    vol.reset();
  });

  it('errors if name is not in camel case', () => {
    expect(() => {
      finder = new ConfigFinder({ name: 'Boosty Boost' }, cache);
    }).toThrow(
      'Invalid ConfigFinder field "name". String must be in camel case. (pattern "^[a-z][0-9A-Za-z]+$")',
    );
  });

  describe('loadFromBranchToRoot()', () => {
    const fixtures = [
      { ext: 'js', tree: configFileTreeJS },
      { ext: 'json', tree: configFileTreeJSON },
      { ext: 'cjs', tree: configFileTreeCJS },
      { ext: 'yaml', tree: configFileTreeYAML },
      { ext: 'yml', tree: configFileTreeYML },
    ];

    fixtures.forEach(({ ext, tree }) => {
      it(`returns all \`.${ext}\` config files from a branch up to root`, async () => {
        vol.fromJSON(tree, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/app/profiles/settings');

        expect(files).toEqual([
          {
            config: { debug: true },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { debug: false },
            path: stubPath(`/test/src/app/.boost.${ext}`),
            source: 'branch',
          },
          {
            config: { verbose: true },
            path: stubPath(`/test/src/app/profiles/settings/.boost.${ext}`),
            source: 'branch',
          },
        ]);
      });
    });

    it('doesnt load config files above root', async () => {
      vol.fromJSON(scenarioConfigsAboveRoot, '/test');

      const files = await finder.loadFromBranchToRoot('/test/nested/deep');

      expect(files).toEqual([
        {
          config: { root: true },
          path: stubPath('/test/nested/.config/boost.json'),
          source: 'root',
        },
        {
          config: { aboveRoot: true },
          path: stubPath('/test/nested/deep/.boost.json'),
          source: 'branch',
        },
      ]);
    });

    it('doesnt load branch config files that do not start with a period', async () => {
      vol.fromJSON(scenarioBranchInvalidFileName, '/test');

      const files = await finder.loadFromBranchToRoot('/test/src/app');

      expect(files).toEqual([
        {
          config: { debug: true },
          path: stubPath('/test/.config/boost.json'),
          source: 'root',
        },
      ]);
    });

    it('doesnt load branch config files that have an unknown extension', async () => {
      vol.fromJSON(scenarioBranchInvalidFileName, '/test');

      const files = await finder.loadFromBranchToRoot('/test/src/app');

      expect(files).toEqual([
        {
          config: { debug: true },
          path: stubPath('/test/.config/boost.json'),
          source: 'root',
        },
      ]);
    });

    it('doesnt load multiple branch config file types, only the first  found', async () => {
      vol.fromJSON(scenarioBranchMultipleTypes, '/test');

      const files = await finder.loadFromBranchToRoot('/test/src/app');

      expect(files).toEqual([
        {
          config: { debug: true },
          path: stubPath('/test/.config/boost.json'),
          source: 'root',
        },
        {
          config: { type: 'json' },
          path: stubPath('/test/src/app/.boost.json'),
          source: 'branch',
        },
      ]);
    });

    describe('environment context', () => {
      it('loads branch config files (using BOOST_ENV)', async () => {
        process.env.BOOST_ENV = 'test';

        vol.fromJSON(scenarioBranchWithEnvs, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/app');

        expect(files).toEqual([
          {
            config: { debug: true },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { env: 'all' },
            path: stubPath('/test/src/app/.boost.json'),
            source: 'branch',
          },
          {
            config: { env: 'test' },
            path: stubPath('/test/src/app/.boost.test.json'),
            source: 'branch',
          },
        ]);

        delete process.env.BOOST_ENV;
      });

      it('loads branch config files (using NODE_ENV)', async () => {
        process.env.NODE_ENV = 'staging';

        vol.fromJSON(scenarioBranchWithEnvs, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/app');

        expect(files).toEqual([
          {
            config: { debug: true },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { env: 'all' },
            path: stubPath('/test/src/app/.boost.json'),
            source: 'branch',
          },
          {
            config: { env: 'staging' },
            path: stubPath('/test/src/app/.boost.staging.json'),
            source: 'branch',
          },
        ]);

        process.env.NODE_ENV = 'test';
      });

      it('doesnt load branch config files if `includeEnv` is false (using BOOST_ENV)', async () => {
        process.env.BOOST_ENV = 'test';

        vol.fromJSON(scenarioBranchWithEnvs, '/test');
        finder.configure({ includeEnv: false });

        const files = await finder.loadFromBranchToRoot('/test/src/app');

        expect(files).toEqual([
          {
            config: { debug: true },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { env: 'all' },
            path: stubPath('/test/src/app/.boost.json'),
            source: 'branch',
          },
        ]);

        delete process.env.BOOST_ENV;
      });
    });

    describe('overrides', () => {
      it('adds overrides that match the `include` glob', async () => {
        vol.fromJSON(overridesFromBranch, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/foo/does-match.ts');

        expect(files).toEqual([
          {
            config: { level: 1 },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { level: 2 },
            path: stubPath('/test/.config/boost.json'),
            source: 'override',
          },
        ]);
      });

      it('adds overrides that match the `include` glob and dont match the `exclude` glob', async () => {
        vol.fromJSON(overridesFromBranchWithExcludes, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/bar.ts');

        expect(files).toEqual([
          {
            config: { level: 1 },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
          {
            config: { level: 2 },
            path: stubPath('/test/.config/boost.json'),
            source: 'override',
          },
        ]);
      });

      it('doesnt add overrides that dont match the `include` glob', async () => {
        vol.fromJSON(overridesFromBranch, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/foo/doesnt-match.js');

        expect(files).toEqual([
          {
            config: { level: 1 },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
        ]);
      });

      it('doesnt add overrides that match the `include` glob AND the `exclude` glob', async () => {
        vol.fromJSON(overridesFromBranchWithExcludes, '/test');

        const files = await finder.loadFromBranchToRoot('/test/src/baz.ts');

        expect(files).toEqual([
          {
            config: { level: 1 },
            path: stubPath('/test/.config/boost.json'),
            source: 'root',
          },
        ]);
      });

      it('errors if overrides are found in a branch config', async () => {
        vol.fromJSON(invalidBranchNestedOverrides, '/test');

        await expect(finder.loadFromBranchToRoot('/test/src')).rejects.toThrow(
          'Overrides setting `overrides` must only be defined in a root config.',
        );
      });
    });
  });

  describe('loadFromRoot()', () => {
    const fixtures = [
      { ext: 'js', tree: rootConfigJS },
      { ext: 'json', tree: rootConfigJSON },
      { ext: 'cjs', tree: rootConfigCJS },
      { ext: 'yaml', tree: rootConfigYAML },
      { ext: 'yml', tree: rootConfigYML },
    ];

    fixtures.forEach(({ ext, tree }) => {
      it(`returns \`.${ext}\` config file from root`, async () => {
        vol.fromJSON(tree, '/test');

        const files = await finder.loadFromRoot('/test');

        expect(files).toEqual([
          {
            config: { debug: true },
            path: stubPath(`/test/.config/boost.${ext}`),
            source: 'root',
          },
        ]);
      });
    });

    it('errors if not root folder', async () => {
      vol.fromJSON({ './src': '' }, '/test');

      await expect(finder.loadFromRoot('/test/src')).rejects.toThrow(
        'Invalid configuration root. Requires a `.config` folder and `package.json`.',
      );
    });

    it('errors if root folder is missing a `package.json`', async () => {
      vol.fromJSON(rootWithoutPackageJson, '/test');

      await expect(finder.loadFromRoot('/test')).rejects.toThrow(
        'Config folder `.config` found without a relative `package.json`. Both must be located in the project root.',
      );
    });
  });
});
