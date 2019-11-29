import { getFixturePath, copyFixtureToNodeModule, getNodeModulePath } from '@boost/test-utils';
import { PathResolver, Path } from '../src';

describe('PathResolver', () => {
  let resolver: PathResolver;

  beforeEach(() => {
    resolver = new PathResolver();
  });

  it('throws an error if no path is resolved', () => {
    resolver.lookupNodeModule('foo-bar');
    resolver.lookupFilePath('foo/bar');
    resolver.lookupFilePath('bar/baz');
    resolver.lookupNodeModule('bar-baz');

    expect(() => {
      resolver.resolve();
    }).toThrowErrorMatchingSnapshot();
  });

  describe('file system', () => {
    it('returns first resolved path', () => {
      const cwd = getFixturePath('module-basic');

      resolver.lookupFilePath('qux.js', cwd); // Doesnt exist
      resolver.lookupFilePath('bar.js', cwd); // Exists
      resolver.lookupFilePath('foo.js', cwd); // Exists

      expect(resolver.resolve()).toEqual(new Path(cwd, 'bar.js'));
    });

    it('supports different cwds', () => {
      const cwd = getFixturePath('module-basic');

      resolver.lookupFilePath('qux.js', cwd); // Doesnt exist
      resolver.lookupFilePath('bar.js'); // Doesnt exist at this cwd
      resolver.lookupFilePath('foo.js', cwd); // Exists

      expect(resolver.resolve()).toEqual(new Path(cwd, 'foo.js'));
    });

    it('works with completely different parent folders and file extensions', () => {
      const src = new Path(__dirname, '../src');

      resolver.lookupFilePath('qux.js', getFixturePath('module-basic')); // Doesnt exist
      resolver.lookupFilePath('bar.js', src); // Doesnt exist
      resolver.lookupFilePath('toArray.ts', src.append('helpers')); // Exists

      expect(resolver.resolve()).toEqual(new Path(src, 'helpers/toArray.ts'));
    });
  });

  describe('node modules', () => {
    it('returns first resolved module', () => {
      resolver.lookupNodeModule('@boost/unknown'); // Doesnt exist
      resolver.lookupNodeModule('@boost/common'); // Exists
      resolver.lookupNodeModule('@boost/log'); // Exists

      expect(resolver.resolve()).toEqual(new Path(require.resolve('@boost/common')));
    });

    it('works with sub-paths', () => {
      const unmock = copyFixtureToNodeModule('module-basic', 'test-module-path-resolver');

      resolver.lookupNodeModule('test-module-path-resolver/qux'); // Doesnt exist
      resolver.lookupNodeModule('test-module-path-resolver/bar'); // Exists (without extension)
      resolver.lookupNodeModule('test-module-path-resolver/foo.js'); // Exists

      expect(resolver.resolve()).toEqual(
        new Path(getNodeModulePath('test-module-path-resolver', 'bar.js')),
      );

      unmock();
    });
  });
});