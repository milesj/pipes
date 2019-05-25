/* eslint-disable no-param-reassign */

import execa from 'execa';
import { Predicates } from 'optimal';
import { mockDebugger } from '@boost/debug/lib/testing';
import { mockTool, mockRoutine, stubToolConfig } from '../src/testUtils';
import Routine from '../src/Routine';
import Task from '../src/Task';
import Tool from '../src/Tool';
import { STATUS_PASSED, STATUS_FAILED, STATUS_RUNNING } from '../src/constants';

jest.mock('execa');

describe('Routine', () => {
  let routine: Routine<any, any>;
  let tool: Tool<any, any>;

  class TestRoutine extends Routine<any, any> {
    execute(ctx: any, value: any) {
      return Promise.resolve(value);
    }
  }

  beforeEach(() => {
    tool = mockTool();
    tool.config = {
      ...stubToolConfig(),
      baz: {
        compress: true,
        outDir: './out/',
      },
      foo: {
        command: 'yarn run build',
      },
    };

    routine = new TestRoutine('key', 'Title');
    routine.configure(mockRoutine(tool));
  });

  class FailureRoutine extends Routine<any, any, { test: number }> {
    constructor(key: string, title: string, options?: any) {
      super(key, title, options);

      this.debug = mockDebugger();
    }

    blueprint({ number }: Predicates) {
      return {
        test: number(),
      };
    }

    async execute(): Promise<any> {
      throw new Error('Failure');
    }
  }

  class ContextRoutine extends Routine<any, any, { multiplier: number; return: boolean }> {
    constructor(key: string, title: string, options?: any) {
      super(key, title, options);

      this.tool = tool;
      this.debug = mockDebugger();

      this.task('foo', this.foo);
      this.task('bar', this.bar);
      this.task('baz', this.baz);
    }

    blueprint({ number, bool }: Predicates) {
      return {
        multiplier: number(),
        return: bool(),
      };
    }

    async execute(context: any, value: any): Promise<any> {
      context.count *= this.options.multiplier;
      context[this.key] = true;

      return this.options.return ? this.key : value;
    }

    foo(context: any, value: any) {
      context.foo = 123;

      return value;
    }

    bar(context: any, value: any) {
      context.bar = 456;

      return value;
    }

    baz(context: any, value: any) {
      context.baz = 789;

      return value;
    }
  }

  describe('constructor()', () => {
    it('throws an error if no key is provided', () => {
      expect(() => new TestRoutine('', 'title')).toThrowErrorMatchingSnapshot();
    });

    it('throws an error if key is not a string', () => {
      // @ts-ignore
      expect(() => new TestRoutine(123, 'title')).toThrowErrorMatchingSnapshot();
    });

    it('inherits default options', () => {
      routine = new FailureRoutine('key', 'title', { test: 123 });

      expect(routine.options).toEqual({ test: 123 });
    });
  });

  describe('configure()', () => {
    it('triggers bootstrap', () => {
      let config = {};

      class BootstrapRoutine extends Routine<any, any> {
        constructor(key: string, title: string) {
          super(key, title);

          this.debug = mockDebugger();
        }

        bootstrap() {
          ({ config } = this.tool);
        }

        async execute(): Promise<any> {
          return Promise.resolve();
        }
      }

      const parent = mockRoutine(tool);
      // @ts-ignore
      parent.options.foo = 'bar';

      routine = new BootstrapRoutine('bootstrap', 'title');
      routine.configure(parent);

      expect(config).toEqual(tool.config);
    });

    it('increases depth with each parent', () => {
      const parent = mockRoutine(tool);
      const child = mockRoutine(tool);
      const grandchild = mockRoutine(tool);

      expect(parent.metadata.depth).toBe(0);
      expect(child.metadata.depth).toBe(0);
      expect(grandchild.metadata.depth).toBe(0);

      child.configure(parent);
      grandchild.configure(child);

      expect(parent.metadata.depth).toBe(0);
      expect(child.metadata.depth).toBe(1);
      expect(grandchild.metadata.depth).toBe(2);
    });
  });

  describe('executeCommand()', () => {
    class FakeStream {
      pipe() {
        return this;
      }

      on(event: string, handler: (line: string) => any) {
        handler('Mocked stream line');

        return this;
      }

      toString() {
        return '';
      }
    }

    beforeEach(() => {
      ((execa as any) as jest.Mock).mockImplementation((cmd, args) => ({
        cmd: `${cmd} ${args.join(' ')}`,
        stdout: new FakeStream(),
        stderr: new FakeStream(),
      }));

      (execa.shell as jest.Mock).mockImplementation(cmd => ({ cmd: `/bin/sh -c ${cmd}` }));
    });

    it('runs a local command', async () => {
      const result = await routine.executeCommand('yarn', ['-v']);

      expect(result).toEqual(expect.objectContaining({ cmd: 'yarn -v' }));
    });

    it('runs a local command in a shell', async () => {
      const result = await routine.executeCommand('echo', ['boost'], { shell: true });

      expect(execa.shell).toHaveBeenCalledWith('echo boost', {});
      expect(result).toEqual({ cmd: '/bin/sh -c echo boost' });
    });

    it('runs a local command in a shell with args used directly', async () => {
      const result = await routine.executeCommand('echo boost', [], { shell: true });

      expect(execa.shell).toHaveBeenCalledWith('echo boost', {});
      expect(result).toEqual({ cmd: '/bin/sh -c echo boost' });
    });

    it('calls callback with stream', async () => {
      const spy = jest.fn();

      await routine.executeCommand('yarn', ['-v'], { wrap: spy });

      expect(spy).toHaveBeenCalled();
    });

    it('pipes stdout/stderr to handler', async () => {
      const commandSpy = jest.fn();
      const commandDataSpy = jest.fn();
      const task = new Task('title', () => {});

      routine.onCommand.listen(commandSpy);
      routine.onCommandData.listen(commandDataSpy);
      task.status = STATUS_RUNNING;

      await routine.executeCommand('yarn', ['-v'], { task });

      expect(commandSpy).toHaveBeenCalledWith('yarn');
      expect(commandDataSpy).toHaveBeenCalledWith('yarn', expect.anything());
    });

    it('sets `statusText` on task', async () => {
      const task = new Task('title', () => {});

      task.status = STATUS_RUNNING;

      await routine.executeCommand('yarn', ['--help'], { task });

      expect(task.statusText).toBe('Mocked stream line');
    });

    it('sets `output` on task', async () => {
      const task = new Task('title', () => {});

      task.status = STATUS_RUNNING;

      await routine.executeCommand('yarn', ['-v'], { task });

      expect(task.output).toBe('Mocked stream lineMocked stream line');
    });

    it('doesnt set `statusText` or `output` on task when not running', async () => {
      const task = new Task('title', () => {});

      await routine.executeCommand('yarn', ['-v'], { task });

      expect(task.statusText).toBe('');
      expect(task.output).toBe('');
    });
  });

  describe('parallelizeRoutines()', () => {
    it('returns a resolved promise if no routines exist', async () => {
      expect(await routine.parallelizeRoutines('abc')).toEqual([]);
    });

    it('captures and rethrows errors that occur down the chain', async () => {
      routine.pipe(new FailureRoutine('failure', 'title'));

      try {
        await routine.parallelizeRoutines('abc');
      } catch (error) {
        expect(error).toEqual(new Error('Failure'));
      }
    });

    it('passes context through routines when ran', async () => {
      const context = {
        count: 3,
        parallel: 'routine',
      };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2 }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 3 }))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2 }));

      routine.action = (ctx, value) => routine.parallelizeRoutines(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: true,
        baz: true,
        count: 36,
        foo: true,
        parallel: 'routine',
      });
      expect(routine.context).toBe(context);
    });

    it('can run a specific list of routines', async () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      routine.action = (ctx, value) => routine.parallelizeRoutines(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('parallelizeTasks()', () => {
    class FailureTaskRoutine extends Routine<any, any> {
      constructor(key: string, title: string) {
        super(key, title);

        this.tool = tool;
        this.debug = mockDebugger();
      }

      async execute(): Promise<any> {
        return Promise.resolve();
      }

      foo(context: any, value: any) {
        return `${value}-foo`;
      }

      bar() {
        throw new Error('Failure');
      }
    }

    it('returns a resolved promise if no tasks exist', async () => {
      expect(await routine.parallelizeTasks('abc')).toEqual([]);
    });

    it('captures and rethrows errors that occur down the chain', async () => {
      routine = new FailureTaskRoutine('failure', 'title');
      // @ts-ignore
      routine.task('foo', routine.foo);
      // @ts-ignore
      routine.task('bar', routine.bar);

      try {
        await routine.parallelizeTasks('abc');
      } catch (error) {
        expect(error).toEqual(new Error('Failure'));
      }
    });

    it('supports normal functions', async () => {
      routine.task('upper', (context, value) => value.toUpperCase());
      routine.task('dupe', (context, value) => `${value}${value}`);

      expect(await routine.parallelizeTasks('abc')).toEqual(['ABC', 'abcabc']);
    });

    it('passes context through tasks when ran', async () => {
      const context = { parallel: 'task' };

      routine = new ContextRoutine('context', 'title');
      routine.action = (ctx, value) => routine.parallelizeTasks(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: 456,
        baz: 789,
        foo: 123,
        parallel: 'task',
      });
      expect(routine.context).toBe(context);
    });

    it('can run a specific list of routines', async () => {
      const foo = routine.task('title', () => {});
      const bar = routine.task('title', () => {});
      const baz = routine.task('title', () => {});

      routine.action = (ctx, value) => routine.parallelizeTasks(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('pipe()', () => {
    it('throws an error if a non-Routine is passed', () => {
      // @ts-ignore
      expect(() => routine.pipe('foo')).toThrowErrorMatchingSnapshot();
    });

    it('sets routines in order', () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      expect(Array.from(routine.routines)).toEqual([foo, bar, baz]);
    });

    it('updates index metadata of each routine', () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      expect(foo.metadata.index).toBe(0);
      expect(bar.metadata.index).toBe(1);
      expect(baz.metadata.index).toBe(2);
    });

    it('inherits console from parent routine', () => {
      const foo = mockRoutine(tool, 'foo');

      routine.pipe(foo);

      // @ts-ignore
      expect(foo.console).toBe(routine.console);
    });
  });

  describe('poolRoutines()', () => {
    it('returns a resolved promise if no routines exist', async () => {
      expect(await routine.poolRoutines('abc')).toEqual({ results: [], errors: [] });
    });

    it('passes context through routines when ran', async () => {
      const context = {
        count: 3,
        parallel: 'routine',
      };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2 }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 3 }))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2 }));

      routine.action = (ctx, value) => routine.poolRoutines(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: true,
        baz: true,
        count: 36,
        foo: true,
        parallel: 'routine',
      });
      expect(routine.context).toBe(context);
    });

    it('synchronizes promises, collects errors, and lets all promises finish', async () => {
      const context = { count: 1 };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2, return: true }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 2, return: true }))
        .pipe(new FailureRoutine('err', 'title'))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2, return: true }))
        .pipe(new ContextRoutine('qux', 'title', { multiplier: 2, return: true }));

      routine.action = () => routine.poolRoutines();

      const response = await routine.run(context, undefined);

      expect(context.count).toBe(16);
      expect(response).toEqual({
        errors: [new Error('Failure')],
        results: ['foo', 'bar', 'baz', 'qux'],
      });
    });

    it('can run a specific list of routines', async () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      routine.action = (ctx, value) => routine.poolRoutines(value, {}, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('poolTasks()', () => {
    it('returns a resolved promise if no tasks exist', async () => {
      expect(await routine.poolTasks('abc')).toEqual({ results: [], errors: [] });
    });

    it('supports normal functions', async () => {
      routine.task('upper', (context, value) => value.toUpperCase());
      routine.task('dupe', (context, value) => `${value}${value}`);

      expect(await routine.poolTasks('abc')).toEqual({
        results: ['ABC', 'abcabc'],
        errors: [],
      });
    });

    it('passes context through tasks when ran', async () => {
      const context = { parallel: 'task' };

      routine = new ContextRoutine('context', 'title');
      routine.action = (ctx, value) => routine.poolTasks(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: 456,
        baz: 789,
        foo: 123,
        parallel: 'task',
      });
      expect(routine.context).toBe(context);
    });

    it('synchronizes promises, collects errors, and lets all promises finish', async () => {
      let count = 0;

      routine.task('foo', () => {
        count += 1;

        return 'foo';
      });
      routine.task('bar', () => {
        count += 1;

        return 'bar';
      });
      routine.task('err', () => new Error('Failure'));
      routine.task('baz', () => {
        count += 1;

        return 'baz';
      });
      routine.task('qux', () => {
        count += 1;

        return 'qux';
      });

      routine.action = () => routine.poolTasks();

      const response = await routine.run({}, undefined);

      expect(count).toBe(4);
      expect(response).toEqual({
        errors: [new Error('Failure')],
        results: ['foo', 'bar', 'baz', 'qux'],
      });
    });

    it('can run a specific list of routines', async () => {
      const foo = routine.task('title', () => {});
      const bar = routine.task('title', () => {});
      const baz = routine.task('title', () => {});

      routine.action = (ctx, value) => routine.poolTasks(value, {}, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('run()', () => {
    it('returns a promise', () => {
      expect(routine.run({}, 123)).toBeInstanceOf(Promise);
    });

    it('passes the value down the promise', async () => {
      expect(await routine.run({}, 123)).toBe(123);
    });

    it('updates status if a success', async () => {
      await routine.run({}, 123);

      expect(routine.status).toBe(STATUS_PASSED);
    });

    it('updates status if a failure', async () => {
      routine.action = () => {
        throw new Error('Failure');
      };

      try {
        await routine.run({}, 123);
      } catch (error) {
        expect(error).toEqual(new Error('Failure'));
      }

      expect(routine.status).toBe(STATUS_FAILED);
    });

    it('passes task as 3rd argument to action', async () => {
      const spy = jest.fn();

      routine.action = spy;

      await routine.run({}, 123);

      expect(spy).toHaveBeenCalledWith({}, 123, routine);
    });
  });

  describe('serializeRoutines()', () => {
    class SerializeSubsRoutine extends Routine<any, any, { multiplier: number }> {
      constructor(key: string, title: string, options?: { multiplier: number }) {
        super(key, title, options);

        this.tool = tool;
        this.debug = mockDebugger();
      }

      blueprint({ number }: Predicates) {
        return {
          multiplier: number(),
        };
      }

      async execute(context: any, value: any): Promise<any> {
        return Promise.resolve({
          count: value.count * this.options.multiplier!,
          key: value.key + this.key,
        });
      }
    }

    it('returns initial value if no tasks', async () => {
      routine = new SerializeSubsRoutine('key', 'title');

      expect(await routine.serializeRoutines(123)).toBe(123);
    });

    it('executes all chained routines in sequential order', async () => {
      const foo = new SerializeSubsRoutine('foo', 'title', { multiplier: 2 });
      const bar = new SerializeSubsRoutine('bar', 'title', { multiplier: 3 });
      const baz = new SerializeSubsRoutine('baz', 'title', { multiplier: 1 });

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      expect(await routine.serializeRoutines({ count: 6, key: '' })).toEqual({
        count: 36,
        key: 'foobarbaz',
      });
    });

    it('passes context through routines when ran', async () => {
      const context = {
        count: 3,
        serial: 'routine',
      };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2 }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 3 }))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2 }));

      routine.action = (ctx, value) => routine.serializeRoutines(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: true,
        baz: true,
        count: 36,
        foo: true,
        serial: 'routine',
      });
      expect(routine.context).toBe(context);
    });

    it('can run a specific list of routines', async () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      routine.action = (ctx, value) => routine.serializeRoutines(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('serializeTasks()', () => {
    class SerializeTasksRoutine extends Routine<any, any> {
      constructor(key: string, title: string) {
        super(key, title);

        this.tool = tool;
        this.debug = mockDebugger();
      }

      async execute(): Promise<any> {
        return Promise.resolve();
      }

      duplicate(context: any, value: any) {
        return `${value}${value}`;
      }

      upperCase(context: any, value: any) {
        return value.toUpperCase();
      }
    }

    it('returns initial value if no tasks', async () => {
      routine = new SerializeTasksRoutine('key', 'title');

      expect(await routine.serializeTasks(123)).toBe(123);
    });

    it('executes all passed tasks in sequential order', async () => {
      routine = new SerializeTasksRoutine('key', 'title');
      // @ts-ignore
      routine.task('upper', routine.upperCase);
      // @ts-ignore
      routine.task('dupe', routine.duplicate);

      expect(await routine.serializeTasks('foo')).toBe('FOOFOO');
    });

    it('supports normal functions', async () => {
      routine.task('upper', (context, value) => value.toUpperCase());
      routine.task('dupe', (context, value) => `${value}${value}`);

      expect(await routine.serializeTasks('foo')).toBe('FOOFOO');
    });

    it('passes context through tasks when ran', async () => {
      const context = { serial: 'task' };

      routine = new ContextRoutine('context', 'title');
      routine.action = (ctx, value) => routine.serializeTasks(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: 456,
        baz: 789,
        foo: 123,
        serial: 'task',
      });
      expect(routine.context).toBe(context);
    });

    it('can run a specific list of routines', async () => {
      const foo = routine.task('title', () => {});
      const bar = routine.task('title', () => {});
      const baz = routine.task('title', () => {});

      routine.action = (ctx, value) => routine.serializeTasks(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('synchronizeRoutines()', () => {
    it('returns a resolved promise if no routines exist', async () => {
      expect(await routine.synchronizeRoutines('abc')).toEqual({ results: [], errors: [] });
    });

    it('passes context through routines when ran', async () => {
      const context = {
        count: 3,
        parallel: 'routine',
      };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2 }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 3 }))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2 }));

      routine.action = (ctx, value) => routine.synchronizeRoutines(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: true,
        baz: true,
        count: 36,
        foo: true,
        parallel: 'routine',
      });
      expect(routine.context).toBe(context);
    });

    it('synchronizes promises, collects errors, and lets all promises finish', async () => {
      const context = { count: 1 };

      routine
        .pipe(new ContextRoutine('foo', 'title', { multiplier: 2, return: true }))
        .pipe(new ContextRoutine('bar', 'title', { multiplier: 2, return: true }))
        .pipe(new FailureRoutine('err', 'title'))
        .pipe(new ContextRoutine('baz', 'title', { multiplier: 2, return: true }))
        .pipe(new ContextRoutine('qux', 'title', { multiplier: 2, return: true }));

      routine.action = () => routine.synchronizeRoutines();

      const response = await routine.run(context, undefined);

      expect(context.count).toBe(16);
      expect(response).toEqual({
        errors: [new Error('Failure')],
        results: ['foo', 'bar', 'baz', 'qux'],
      });
    });

    it('can run a specific list of routines', async () => {
      const foo = mockRoutine(tool, 'foo');
      const bar = mockRoutine(tool, 'bar');
      const baz = mockRoutine(tool, 'baz');

      routine
        .pipe(foo)
        .pipe(bar)
        .pipe(baz);

      routine.action = (ctx, value) => routine.synchronizeRoutines(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('synchronizeTasks()', () => {
    it('returns a resolved promise if no tasks exist', async () => {
      expect(await routine.synchronizeTasks('abc')).toEqual({ results: [], errors: [] });
    });

    it('supports normal functions', async () => {
      routine.task('upper', (context, value) => value.toUpperCase());
      routine.task('dupe', (context, value) => `${value}${value}`);

      expect(await routine.synchronizeTasks('abc')).toEqual({
        results: ['ABC', 'abcabc'],
        errors: [],
      });
    });

    it('passes context through tasks when ran', async () => {
      const context = { parallel: 'task' };

      routine = new ContextRoutine('context', 'title');
      routine.action = (ctx, value) => routine.synchronizeTasks(value);

      await routine.run(context, undefined);

      expect(context).toEqual({
        bar: 456,
        baz: 789,
        foo: 123,
        parallel: 'task',
      });
      expect(routine.context).toBe(context);
    });

    it('synchronizes promises, collects errors, and lets all promises finish', async () => {
      let count = 0;

      routine.task('foo', () => {
        count += 1;

        return 'foo';
      });
      routine.task('bar', () => {
        count += 1;

        return 'bar';
      });
      routine.task('err', () => new Error('Failure'));
      routine.task('baz', () => {
        count += 1;

        return 'baz';
      });
      routine.task('qux', () => {
        count += 1;

        return 'qux';
      });

      routine.action = () => routine.synchronizeTasks();

      const response = await routine.run({}, undefined);

      expect(count).toBe(4);
      expect(response).toEqual({
        errors: [new Error('Failure')],
        results: ['foo', 'bar', 'baz', 'qux'],
      });
    });

    it('can run a specific list of routines', async () => {
      const foo = routine.task('title', () => {});
      const bar = routine.task('title', () => {});
      const baz = routine.task('title', () => {});

      routine.action = (ctx, value) => routine.synchronizeTasks(value, [bar]);

      await routine.run({}, undefined);

      expect(foo.isPending()).toBe(true);
      expect(bar.isPending()).toBe(false);
      expect(baz.isPending()).toBe(true);
    });
  });

  describe('task()', () => {
    it('errors if not a function', () => {
      expect(() => {
        // @ts-ignore
        routine.task('foo', 'bar');
      }).toThrowErrorMatchingSnapshot();
    });

    it('maps `Task` objects', () => {
      expect(routine.tasks).toHaveLength(0);

      routine.task('foo', value => value);
      routine.task('bar', value => value);

      expect(routine.tasks).toHaveLength(2);

      const tasks = Array.from(routine.tasks);

      expect(tasks[0].constructor.name).toBe('Task');
      expect(tasks[1].constructor.name).toBe('Task');
    });

    it('binds the action function to the routine', async () => {
      let options;

      routine.task('foo', function foo() {
        // @ts-ignore
        ({ options } = this); // eslint-disable-line babel/no-invalid-this
      });

      await Array.from(routine.tasks)[0].run({}, undefined);

      expect(options).toEqual(routine.options);
    });

    it('returns a `Task` instance', () => {
      const task = routine.task('foo', value => value);

      expect(task.constructor.name).toBe('Task');
    });

    it('sets routine as parent', () => {
      const task = routine.task('foo', value => value);

      expect(task.parent).toBe(routine);
    });

    it('updates index metadata of each task', () => {
      const foo = routine.task('foo', value => value);
      const bar = routine.task('bar', value => value);
      const baz = routine.task('baz', value => value);

      expect(foo.metadata.index).toBe(0);
      expect(bar.metadata.index).toBe(1);
      expect(baz.metadata.index).toBe(2);
    });
  });
});
