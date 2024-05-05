export function hasKeyValue(obj: any): obj is { [key: string]: any } {
  return typeof obj === 'object' && Object.keys(obj).length > 0;
}
