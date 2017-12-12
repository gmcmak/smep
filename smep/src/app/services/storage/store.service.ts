export interface Store {

  containsKey(key: string): boolean;
  get(key: string): any;
  put(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
  keys(): string[];
  
}