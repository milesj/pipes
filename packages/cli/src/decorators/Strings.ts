import 'reflect-metadata';
import { MultipleOption } from '@boost/args';
import createOptionFactory from '../metadata/createOptionFactory';
import { PartialConfig } from '../types';
import { stringsOptionBlueprint } from '../metadata/blueprints';

export default function Strings(
  description: string,
  config?: PartialConfig<MultipleOption<string[]>>,
) {
  // Property
  return createOptionFactory<MultipleOption<string[]>>(
    {
      ...config,
      default: [],
      description,
      multiple: true,
      type: 'string',
    },
    stringsOptionBlueprint,
  );
}
