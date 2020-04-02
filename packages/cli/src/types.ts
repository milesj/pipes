// Some `any` is used so that its easier for consumers
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  Argv,
  ArgList,
  Arguments,
  Command as BaseCommandConfig,
  MapOptionConfig,
  MapParamConfig,
  Option,
  OptionConfig,
  OptionConfigMap,
  Param,
  ParamConfig,
  ParamConfigList,
  ParserOptions,
  PrimitiveType,
} from '@boost/args';
import { Logger } from '@boost/log';

export {
  Argv,
  ArgList,
  Arguments,
  Option,
  OptionConfig,
  OptionConfigMap,
  Param,
  ParamConfig,
  ParamConfigList,
};

export type PartialConfig<T> = Omit<T, 'default' | 'description' | 'multiple' | 'path' | 'type'>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type StreamType = 'stderr' | 'stdout';

export interface GlobalOptions {
  help: boolean;
  locale: string;
  version: boolean;
}

export type Options<T extends object> = MapOptionConfig<Omit<T, keyof GlobalOptions>>;

export type Params<T extends PrimitiveType[]> = MapParamConfig<T>;

// PROGRAM

export type ExitCode = number;

export type ExitHandler = (message: string, code?: ExitCode) => void;

export interface ProgramOptions {
  banner?: string;
  bin: string;
  footer?: string;
  header?: string;
  name: string;
  version: string;
}

export interface ProgramStreams {
  stderr: NodeJS.WriteStream;
  stdin: NodeJS.ReadStream;
  stdout: NodeJS.WriteStream;
}

export interface ProgramContextType {
  exit: ExitHandler;
  log: Logger;
  program: ProgramOptions;
}

// COMMANDS

export type RunResult = void | undefined | string | React.ReactElement;

export type CommandPath = string;

export interface CommandConfig extends BaseCommandConfig {
  aliases?: string[];
  options?: OptionConfigMap;
  params?: ParamConfigList;
  path?: CommandPath; // Canonical name used on the command line
}

export interface CommandConfigMap {
  [path: string]: CommandConfig;
}

// Constructor
export interface CommandStaticConfig extends Required<CommandConfig> {
  allowUnknownOptions?: boolean;
}

export interface CommandMetadata extends CommandStaticConfig {
  commands: { [path: string]: Commandable };
}

export interface CommandMetadataMap {
  [path: string]: CommandMetadata;
}

export interface Commandable<O extends object = any, P extends PrimitiveType[] = any[]> {
  getMetadata(): CommandMetadata;
  getParserOptions(): ParserOptions<O, P>;
  getPath(): CommandPath;
  renderHelp(): string | React.ReactElement;
  run(...params: P): RunResult | Promise<RunResult>;
}

// PROXY COMMANDS

export interface ProxyCommandConfig<O extends object, P extends PrimitiveType[]>
  extends BaseCommandConfig {
  aliases?: string[];
  options?: MapOptionConfig<O>;
  params?: MapParamConfig<P>;
}

export type ProxyCommandRunner<O extends object, P extends PrimitiveType[]> = (
  options: O,
  params: P,
  rest: string[],
) => RunResult | Promise<RunResult>;

// MIDDLEWARE

export type MiddlewareArguments = Arguments<GlobalOptions, ArgList>;

export type MiddlewareNext = (argv: Argv) => MiddlewareArguments | Promise<MiddlewareArguments>;

export type Middleware = (
  argv: Argv,
  next: MiddlewareNext,
) => MiddlewareArguments | Promise<MiddlewareArguments>;

// THEMES

export type StyleType = 'default' | 'inverted' | 'failure' | 'muted' | 'success' | 'warning';

export type ThemePalette = { [T in StyleType]: string };
