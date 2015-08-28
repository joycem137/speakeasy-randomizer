/*
 * Math Utils are various methods for doing simple math
 * modifications.
 */
module.exports = {
    /**
     * Returns a value clamped between the two specified values, inclusive.
     *
     */
    clamp: function(value, min, max) {
        return Math.max(min, Math.min(value, max));
    },

    /**
     * Returns true if the value is between the indicated values,
     * inclusive.
     */
    checkClamped: function(value, min, max) {
        return value >= min && value <= max;
    }
};
