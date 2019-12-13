import 'reflect-metadata';
import { META_REST } from './constants';

export default function Rest(target: Object, property: string) {
  Reflect.defineMetadata(META_REST, { property }, target);
}
