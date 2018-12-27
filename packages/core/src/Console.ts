/**
 * @copyright   2017-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable unicorn/no-hex-escape */

import exit from 'exit';
import envCI from 'env-ci';
import cliTruncate from 'cli-truncate';
import cliSize from 'term-size';
import ansiEscapes from 'ansi-escapes';
import stripAnsi from 'strip-ansi';
import wrapAnsi from 'wrap-ansi';
import Emitter from './Emitter';
import Output from './Output';
import Tool from './Tool';
import { Debugger } from './types';

export type WrappedStream = (message: string, nl?: number) => void;

function noop() {}

export default class Console extends Emitter {
  bufferedStreams: (() => void)[] = [];

  debug: Debugger;

  err: WrappedStream;

  errorLogs: string[] = [];

  exiting: boolean = false;

  logs: string[] = [];

  out: WrappedStream;

  restoreCursorOnExit: boolean = false;

  tool: Tool<any, any>;

  constructor(tool: Tool<any, any>) {
    super();

    this.debug = tool.createDebugger('console');
    this.tool = tool;
    this.out = noop;
    this.err = noop;

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      process
        .on('SIGINT', this.handleSignal)
        .on('SIGTERM', this.handleSignal)
        .on('uncaughtException', this.handleFailure)
        .on('unhandledRejection', this.handleFailure);
    }
  }

  /**
   * Clear the entire console.
   */
  clearOutput(): this {
    this.out(ansiEscapes.eraseScreen);

    return this;
  }

  /**
   * Display a footer after all final output.
   */
  displayFooter() {
    const { footer } = this.tool.options;

    if (footer) {
      this.out(footer, 1);
    }
  }

  /**
   * Display a header before all final output.
   */
  displayHeader() {
    const { header } = this.tool.options;

    if (header) {
      this.out(header, 1);
    }
  }

  /**
   * Display logs in the final output.
   */
  displayLogs(logs: string[]) {
    if (logs.length > 0) {
      this.out(`\n${logs.join('\n')}\n`);
    }
  }

  /**
   * Force exit the application.
   */
  exit(message: string | Error | null, code: number, force: boolean = false) {
    // Another flow has already triggered the exit
    if (this.exiting) {
      return;
    }

    this.exiting = true;

    let error = null;

    if (message !== null) {
      error = message instanceof Error ? message : new Error(message);
    }

    if (error) {
      this.debug('Exiting console with an error');

      // Mark logs as errors
      if (force) {
        this.errorLogs.push(...this.logs);
        this.logs = [];
      }
    } else {
      this.debug('Exiting console rendering process');
    }

    this.emit('stop', [error, code]);

    // Render final output
    this.renderFinalOutput(error);

    // Unwrap our streams
    this.err = this.unwrapStream('stderr');
    this.out = this.unwrapStream('stdout');

    // Exit after buffers have flushed
    if (force) {
      setTimeout(() => {
        exit(code);
      }, 0);
    } else {
      process.exitCode = code;
    }
  }

  /**
   * Flush buffered streams output after clearing lines rendered by the reporter.
   */
  flushBufferedStreams(): this {
    this.bufferedStreams.forEach(buffer => {
      buffer();
    });

    return this;
  }

  /**
   * Handle uncaught exceptions and unhandled rejections that bubble up.
   */
  handleFailure = (error: Error) => {
    this.start();
    this.debug('Uncaught exception or unresolved promise handled');
    this.exit(error, 1, true);
  };

  /**
   * Handle SIGINT and SIGTERM interruptions.
   */
  handleSignal = () => {
    this.start();
    this.debug('SIGINT or SIGTERM handled');
    this.exit('Process has been terminated.', 1, true);
  };

  /**
   * Hide the console cursor.
   */
  hideCursor(): this {
    this.out(ansiEscapes.cursorHide);

    if (!this.restoreCursorOnExit) {
      this.restoreCursorOnExit = true;

      /* istanbul ignore next */
      process.on('exit', () => {
        this.showCursor();
      });
    }

    return this;
  }

  /**
   * Store the log message.
   */
  log(message: string): this {
    this.logs.push(message);

    return this;
  }

  /**
   * Log the live message immediately to the console.
   */
  logLive(message: string): this {
    this.out(message);

    return this;
  }

  /**
   * Store the error message.
   */
  logError(message: string): this {
    this.errorLogs.push(message);

    return this;
  }

  /**
   * TODO
   */
  render(output: string | Output): this {
    this.flushBufferedStreams();

    if (output instanceof Output) {
      this.out(output.render());
    } else if (output) {
      this.out(String(output));
    }

    return this;
  }

  /**
   * Handle the final render before exiting.
   */
  renderFinalOutput(error: Error | null = null) {
    this.debug('Rendering final console output');
    this.flushBufferedStreams();

    if (error) {
      this.emit('render');
      this.displayLogs(this.errorLogs);
      this.emit('error', [error]);
    } else {
      this.emit('render');
      this.displayLogs(this.logs);
      this.displayFooter();
    }
  }

  /**
   * Reset the cursor back to the bottom of the console.
   */
  resetCursor(): this {
    this.out(ansiEscapes.cursorTo(0, this.size().rows));

    return this;
  }

  /**
   * Show the console cursor.
   */
  showCursor(): this {
    this.out(ansiEscapes.cursorShow);

    return this;
  }

  /**
   * Return size information about the terminal window.
   */
  size(): { columns: number; rows: number } {
    return cliSize();
  }

  /**
   * Start the console by wrapping streams and buffering output.
   */
  start(args: any[] = []): this {
    this.err = this.wrapStream('stderr');
    this.out = this.wrapStream('stdout');

    this.debug('Starting console rendering process');
    this.emit('start', args);
    this.displayHeader();

    return this;
  }

  /**
   * Strip ANSI characters from a string.
   */
  strip(message: string): string {
    return stripAnsi(message);
  }

  /**
   * Truncate a string that may contain ANSI characters to a specific column width.
   */
  truncate(
    message: string,
    columns?: number,
    options?: { position?: 'start' | 'middle' | 'end' },
  ): string {
    return cliTruncate(message, columns || this.size().columns, options);
  }

  /**
   * Unwrap a stream and reset it back to normal.
   */
  unwrapStream(name: 'stdout' | 'stderr') {
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'test') {
      const stream = process[name];

      // @ts-ignore
      stream.write = stream.originalWrite;
    }

    return noop;
  }

  /**
   * Wrap a string that may contain ANSI characters to a specific column width.
   */
  wrap(
    message: string,
    columns?: number,
    options?: { hard?: boolean; trim?: boolean; wordWrap?: boolean },
  ): string {
    return wrapAnsi(message, columns || this.size().columns, {
      hard: true,
      trim: false,
      ...options,
    });
  }

  /**
   * Wrap a stream and buffer the output as to not collide with our reporter.
   */
  /* istanbul ignore next */
  wrapStream(name: 'stdout' | 'stderr'): WrappedStream {
    this.debug('Wrapping %s stream', name);

    const stream = process[name];
    const originalWrite = stream.write.bind(stream);

    if (process.env.NODE_ENV === 'test') {
      return message => originalWrite(message);
    }

    let buffer = '';

    const write = (message: string, nl: number = 0) => {
      if (this.tool.config.silent) {
        return;
      }

      if (stream.isTTY) {
        originalWrite(message + '\n'.repeat(nl));
      }
    };

    const flush = () => {
      if (stream.isTTY && buffer) {
        originalWrite(buffer);
      }

      buffer = '';
    };

    this.bufferedStreams.push(flush);

    stream.write = (chunk: string) => {
      buffer += String(chunk);

      return true;
    };

    // @ts-ignore
    stream.originalWrite = originalWrite;

    return write;
  }
}
