var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration
 * @return {boolean}
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const exists = this.cache.has(key);

    // Agar key pehle se hai to purana timer hata do
    if (exists) {
        clearTimeout(this.cache.get(key).timerID);
    }

    // Naya timer lagao
    const timerID = setTimeout(() => {
        this.cache.delete(key);
    }, duration);

    // Value aur timer store karo
    this.cache.set(key, {
        value,
        timerID
    });

    return exists;
};

/** 
 * @param {number} key
 * @return {number}
 */
TimeLimitedCache.prototype.get = function(key) {
    if (!this.cache.has(key)) {
        return -1;
    }

    return this.cache.get(key).value;
};

/** 
 * @return {number}
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache();
 * 
 * console.log(timeLimitedCache.set(1, 42, 1000)); // false
 * console.log(timeLimitedCache.get(1));           // 42
 * console.log(timeLimitedCache.count());          // 1
 * 
 * setTimeout(() => {
 *     console.log(timeLimitedCache.get(1));       // -1
 *     console.log(timeLimitedCache.count());      // 0
 * }, 1100);
 */