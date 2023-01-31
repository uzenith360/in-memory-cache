"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryCache {
    constructor() {
        this.items = new Map();
    }
    /**
     * @param key key (string)
     * @param value Value (T)
     * @param ttl Time to live in seconds (number)
     */
    set(key, value, ttl) {
        this.items.set(key, { value, expiry: !!ttl ? Date.now() + (ttl * 1000) : undefined });
    }
    get(key) {
        var _a;
        return (_a = this.getKey(key)) === null || _a === void 0 ? void 0 : _a.value;
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
        const expiry = item === null || item === void 0 ? void 0 : item.expiry;
        return !expiry || (Date.now() < expiry) ? item : false;
    }
}
exports.default = InMemoryCache;
