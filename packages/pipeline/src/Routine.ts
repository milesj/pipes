import { createDebugger, Debugger } from '@boost/debug';
import { Event } from '@boost/event';
import Context from './Context';
import WorkUnit from './WorkUnit';

export default abstract class Routine<
  Options extends object,
  Input,
  Output = Input
> extends WorkUnit<Options, Input, Output> {
  debug: Debugger;

  key: string = '';

  onCommand = new Event<[string]>('command');

  onCommandData = new Event<[string, string]>('command.data');

  parent: Routine<any, any, any> | null = null;

  constructor(key: string, title: string, options?: Options) {
    super(title, (context, value) => this.execute(context, value), options);

    if (!key || typeof key !== 'string') {
      throw new Error('Routine key must be a valid unique string.');
    }

    this.key = key;
    this.debug = createDebugger(['routine', this.key]);
  }

  abstract async execute<Ctx extends Context>(context: Ctx, value: Input): Promise<Output>;
}
