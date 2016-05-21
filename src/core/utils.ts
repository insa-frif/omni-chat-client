let _uuid = 0;
export function uuid(prefix: string): string {
  return prefix + (_uuid ++);
}
