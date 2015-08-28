/*
 * A basic pub/sub object.
 *
 * Using one of these, you can subscribe to and publish events quite easily.
 */

/**
 * Construct your basic Observable with no subscribers by default.
 *
 * @constructor
 */
var Observable = function() {
    this._subscribers = [];
};

Observable.prototype = {
    /**
     * Add a new subscriber to listen for events.
     *
     * @param newObserver - Function
     */
    subscribe: function(newObserver) {
        this._subscribers.push(newObserver);
    },

    /**
     * If the provided parameter is a function that was previosuly added in subscribe, it will be removed.
     *
     * @param oldObserver
     */
    unsubscribe: function(oldObserver) {
        var index = this._subscribers.indexOf(oldObserver);
        if (index >= 0) {
            this._subscribers.splice(index);
        }
    },

    /**
     * Calls all subscribers with the provided arguments
     *
     * @param event
     */
    publish: function() {
        var args = arguments;
        this._subscribers.forEach(function(subscriber) {
            subscriber.apply(this, args);
        });
    }
};

module.exports = Observable;
