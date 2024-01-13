class LRU<T, K> {

  private max: number;
  private cache: Map<T, K>;

  constructor(max = 10) {
    this.max = max;
    this.cache = new Map<T, K>();
  }

  clear() {
    this.cache = new Map<T, K>();
  }

  list() {
    return Array.from(this.cache);
  }

  get(key: T) {
    let item = this.cache.get(key);
    if (item !== undefined) {
      // refresh key
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: T, val: K) {
    // refresh key
    if (this.cache.has(key)) this.cache.delete(key);
    // evict oldest
    else if (this.cache.size === this.max) this.cache.delete(this.first());
    this.cache.set(key, val);
  }

  first() {
    return this.cache.keys().next().value;
  }
}

export default LRU;