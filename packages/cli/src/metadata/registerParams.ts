import 'reflect-metadata';
import { ParamConfig } from '@boost/args';
import { META_PARAMS } from '../constants';
import { CommandMetadata } from '../types';

export default function registerParams<T extends Object>(
  target: T,
  method: keyof T,
  config: ParamConfig[],
) {
  if (method !== 'execute') {
    throw new Error('Parameters must be registered on the `execute()` method.');
  }

  const metadata: CommandMetadata['params'] = config;

  Reflect.defineMetadata(META_PARAMS, metadata, target);
}