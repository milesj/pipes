import { Predicates } from '@boost/common';
import Context from '../src/Context';
import ConcurrentPipeline from '../src/ConcurrentPipeline';
import Routine from '../src/Routine';
import WorkUnit from '../src/WorkUnit';
import { Runnable } from '../src/types';

describe('ParallelPipeline', () => {
  it('properly handles a hierarchy', async () => {
    function log(depth: number, index: number) {
      // console.log(`${depth}:${index}`);
    }

    function testTask(depth: number, index: number) {
      return (ctx: Context, value: string, work: Runnable<string, string>) => {
        log(depth, index);

        if (work instanceof WorkUnit) {
          expect(work.depth).toBe(depth);
          expect(work.index).toBe(index);
        }

        return value;
      };
    }

    class TestHierarchy extends Routine<{ depth: number; index: number }, string, string> {
      blueprint({ number }: Predicates) {
        return {
          depth: number(),
          index: number(),
        };
      }

      async execute(ctx: Context, value: string) {
        log(this.depth, this.index);

        expect(this.depth).toBe(this.options.depth);
        expect(this.index).toBe(this.options.index);

        return value;
      }
    }

    class OneTwo extends Routine<{}, string, string> {
      blueprint() {
        return {};
      }

      async execute(ctx: Context, value: string) {
        log(this.depth, this.index);

        expect(this.depth).toBe(1);
        expect(this.index).toBe(2);

        await this.createAggregatedPipeline(ctx, value)
          .add('2:0', testTask(2, 0))
          .add('2:1', testTask(2, 1))
          .add('2:2', testTask(2, 2))
          .run();

        return value;
      }
    }

    class ZeroZero extends Routine<{}, string, string> {
      blueprint() {
        return {};
      }

      async execute(ctx: Context, value: string) {
        log(this.depth, this.index);

        expect(this.depth).toBe(0);
        expect(this.index).toBe(0);

        await this.createPooledPipeline(ctx, value)
          .add(new TestHierarchy('1:0', 'Title', { depth: 1, index: 0 }))
          .add(new TestHierarchy('1:1', 'Title', { depth: 1, index: 1 }))
          .add(new OneTwo('1:2', 'Title'))
          .add(new TestHierarchy('1:3', 'Title', { depth: 1, index: 3 }))
          .run();

        return value;
      }
    }

    const pipeline = new ConcurrentPipeline(new Context(), '')
      .add(new ZeroZero('0:0', 'Title'))
      .add(new TestHierarchy('0:1', 'Title', { depth: 0, index: 1 }));

    expect(pipeline.depth).toBe(0);

    await pipeline.run();
  });
});