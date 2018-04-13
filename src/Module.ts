/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { Struct } from 'optimal';

export interface ModuleInterface {
  moduleName: string;
  name: string;
}

export default class Module<To extends Struct> implements ModuleInterface {
  moduleName: string = '';

  name: string = '';

  options: To;

  constructor(options: Partial<To> = {}) {
    this.options = {
      // @ts-ignore
      ...options,
    };
  }
}