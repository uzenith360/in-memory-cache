import InMemoryCacheItem from "./in-memory-cache-item.interface";

export default class InMemoryCache<T>{
    private items: Map<string, InMemoryCacheItem<T>> = new Map();

    /**
     * 
     * @param key key (string)
     * @param value Value
     * @param ttl Time to live in seconds
     */
    set(key: string, value: T, ttl?: number): void {
        this.items.set(key, { value, expiry: !!ttl ? Date.now() + (ttl * 1000) : undefined })
    }

    get(key: string): T | undefined {
        return this.getKey(key)?.value;
    }

    has(key: string): boolean {
        return !!this.getKey(key);
        // return this.items.has(key);
    }

    del(key: string): void {
        this.items.delete(key);
    }

    clear(): void {
        this.items.clear();
    }

    private getKey(key: string): InMemoryCacheItem<T> | undefined {
        const result: InMemoryCacheItem<T> | undefined | false
            = this.returnKeyIfNotExpiredOrFalse(key);

        return result === false
            ? void this.del(key) || undefined
            : result;
    }

    private returnKeyIfNotExpiredOrFalse(key: string): InMemoryCacheItem<T> | undefined | false {
        const item: InMemoryCacheItem<T> | undefined = this.items.get(key);
        const expiry: number | undefined = item?.expiry;

        return !expiry || (Date.now() < expiry) ? item : false;
    }
}