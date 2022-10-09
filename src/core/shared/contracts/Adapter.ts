export interface Adapter<K, T> {
  fromDb(object: K): T;
}