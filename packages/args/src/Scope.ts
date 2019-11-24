import castValue from './helpers/castValue';
import { LongOptionName, OptionConfig, ValueType } from './types';

export default class Scope {
  config: OptionConfig;

  name: LongOptionName;

  negated: boolean = false;

  value?: string | string[];

  constructor(name: LongOptionName, config: OptionConfig) {
    this.name = name;
    this.config = config;
  }

  get flag(): boolean {
    return this.config.type === 'boolean';
  }

  get finalValue(): ValueType {
    return castValue(this.value, this.config.type);
  }

  captureValue(value: string, commit: () => void) {
    const { config } = this;

    // Update the scope with this new value
    if (config.multiple) {
      (this.value as string[]).push(value);
    } else {
      this.value = value;
    }

    // Commit scope when a single value is set,
    // or when a multiple arity is met.
    if (
      !config.multiple ||
      (config.arity && Array.isArray(this.value) && this.value.length >= config.arity)
    ) {
      commit();
    }
  }
}
