export type NolPrefixedOptions<T> = {
  [Property in keyof T as `nol${Capitalize<string & Property>}`]: T[Property]
};