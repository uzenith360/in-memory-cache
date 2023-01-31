export default class InMemoryCache<T> {
    private items;
    /**
     * @param key key (string)
     * @param value Value (T)
     * @param ttl Time to live in seconds (number)
     */
    set(key: string, value: T, ttl?: number): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    del(key: string): void;
    clear(): void;
    private getKey;
    private returnKeyIfNotExpiredOrFalse;
}
//# sourceMappingURL=in-memory-cache.d.ts.map