export default class InMemoryCache {
    items = new Map();
    /**
     * @param key key (string)
     * @param value Value (T)
     * @param ttl Time to live in seconds (number)
     */
    set(key, value, ttl) {
        this.items.set(key, { value, expiry: !!ttl ? Date.now() + (ttl * 1000) : undefined });
    }
    get(key) {
        return this.getKey(key)?.value;
    }
    has(key) {
        return !!this.getKey(key);
        // return this.items.has(key);
    }
    del(key) {
        this.items.delete(key);
    }
    clear() {
        this.items.clear();
    }
    getKey(key) {
        const result = this.returnKeyIfNotExpiredOrFalse(key);
        return result === false
            ? void this.del(key) || undefined
            : result;
    }
    returnKeyIfNotExpiredOrFalse(key) {
        const item = this.items.get(key);
        const expiry = item?.expiry;
        return !expiry || (Date.now() < expiry) ? item : false;
    }
}
