const LONG_OPTION = /^--[a-z]{1}[-a-z]*$/iu;

export default function isLongOption(arg: string): boolean {
  return LONG_OPTION.test(arg);
}
