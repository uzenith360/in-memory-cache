export default interface InMemoryCacheItem<T> {
    value: T;
    expiry?: number;
}
