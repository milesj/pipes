/* eslint-disable no-magic-numbers, no-param-reassign, max-classes-per-file */

import React from 'react';
import { render } from 'ink';
import { env } from '@boost/internal';
import { stripAnsi } from '@boost/terminal';
import { mockLogger } from '@boost/log/lib/testing';
import { Command, INTERNAL_OPTIONS, INTERNAL_PARAMS, Program, TaskContext } from '.';
import { GlobalOptions, PrimitiveType, ProgramStreams, ProgramOptions, ExitCode } from './types';

export class MockReadStream {
  isTTY = false;
}

export class MockWriteStream {
  append: boolean = false;

  columns: number = 80;

  output: string;

  constructor(append: boolean = false) {
    this.append = append;
    this.output = '';
  }

  write(string: string) {
    if (this.append) {
      this.output += string;
    } else {
      this.output = string;
    }
  }

  get(): string {
    return this.output;
  }
}

export function mockStreams(): ProgramStreams {
  return ({
    stderr: new MockWriteStream(),
    stdin: new MockReadStream(),
    stdout: new MockWriteStream(),
  } as unknown) as ProgramStreams;
}

export function mockProgram(options?: Partial<ProgramOptions>, streams?: ProgramStreams): Program {
  return new Program(
    {
      bin: 'test',
      name: 'Test',
      version: '0.0.0',
      ...options,
    },
    streams || mockStreams(),
  );
}

export async function renderComponent(
  element: React.ReactElement,
  stripped: boolean = false,
): Promise<string> {
  const stdout = new MockWriteStream();

  await render(element, {
    debug: true,
    experimental: true,
    stdout: (stdout as unknown) as NodeJS.WriteStream,
  });

  const output = stdout.get();

  return stripped ? stripAnsi(output) : output;
}

export async function runCommand<O extends GlobalOptions, P extends PrimitiveType[]>(
  command: Command<O, P>,
  params: P,
  options?: O,
): Promise<string> {
  if (options) {
    Object.assign(command, options);
    command[INTERNAL_OPTIONS] = options;
  }

  command.exit = jest.fn();
  command.log = mockLogger();
  command[INTERNAL_PARAMS] = params;

  const result = await command.run(...params);

  if (!result || typeof result === 'string') {
    return result || '';
  }

  return renderComponent(result);
}

export function runTask<A extends unknown[], R, T extends TaskContext>(
  task: (this: T, ...args: A) => R,
  args: A,
  context?: Partial<T>,
): R {
  const notTestable = (name: string) => () => {
    throw new Error(
      `\`${name}\` is not testable using the \`runTask\` utility. Test using a full program.`,
    );
  };

  const baseContext: TaskContext = {
    exit: jest.fn(),
    help: false,
    locale: 'en',
    log: mockLogger(),
    rest: [] as string[],
    runProgram: notTestable('runProgram'),
    runTask: notTestable('runTask'),
    unknown: {},
    version: false,
  };

  return task.apply(
    {
      ...baseContext,
      ...context,
    } as T,
    args,
  );
}

export async function runProgram(
  program: Program,
  argv: string[],
): Promise<{ code: ExitCode; output: string; outputStripped: string }> {
  if (!(program.streams.stderr instanceof MockWriteStream)) {
    program.streams.stderr = (new MockWriteStream() as unknown) as NodeJS.WriteStream;
  }

  if (!(program.streams.stdout instanceof MockWriteStream)) {
    program.streams.stdout = (new MockWriteStream() as unknown) as NodeJS.WriteStream;
  }

  if (!(program.streams.stdin instanceof MockReadStream)) {
    program.streams.stdin = (new MockReadStream() as unknown) as NodeJS.ReadStream;
  }

  // Ink async rendering never resolves while testing,
  // as it relies on system signals to "exit".
  // So we set this to flag the renderer to avoid awaiting.
  env('CLI_TEST_ONLY', 'true');

  const code = await program.run(argv);

  env('CLI_TEST_ONLY', null);

  const output =
    ((program.streams.stdout as unknown) as MockWriteStream).get() +
    ((program.streams.stderr as unknown) as MockWriteStream).get();

  return {
    code,
    output,
    outputStripped: stripAnsi(output),
  };
}