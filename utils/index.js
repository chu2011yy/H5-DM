window.utils = {
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    // 16转10进制
    hetToDec: function(value) {
        if (value === null || value === undefined) return 0;
        const map = {
            a:10,
            b:11,
            c:12,
            d:13,
            e:14,
            f:15
        }
        return isNaN(parseInt(value)) ? map[value.toString().toLowerCase()] : value;
    },
}