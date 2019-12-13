import 'reflect-metadata';
import { Flag as FlagConfig } from '@boost/args';
import createOptionFactory from './metadata/createOptionFactory';
import { PartialConfig } from './types';

export default function Flag(description: string, config?: PartialConfig<FlagConfig>) {
  return createOptionFactory<FlagConfig>({
    ...config,
    default: false,
    description,
    type: 'boolean',
  });
}
