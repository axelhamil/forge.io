export interface Mapper<T, U, V> {
  toDomain(raw: U): T;
  toDTO(domain: T): Promise<V> | V;
}
