/**
 * A variety of extensions to existing JS types.
 */

Array.prototype.pluck = function() {
    var args = Array.prototype.slice.call(arguments);
    return this.map(function(item,index) {
      var newItem = {};

        args.forEach(function(property) {
          newItem[property] = item[property];
      });

      return newItem;
    })
};

Array.prototype.cloneAndAppend = function(iteratorFunction) {
    return this.map(function(item,index,array) {
        var newItem = iteratorFunction(item,index,array);

        for (var key in item) {
            if (newItem[key] === undefined) {
                newItem[key] = item[key];
            }
        }

        return newItem;
    });
};

// Polyfill ES6 find function.
if (Array.prototype.find === undefined) {
    Array.prototype.find = function(callback, thisArg) {
        for (var i = 0, len=this.length; i<len; i++ ) {
            if (callback.call(thisArg || this, this[i], i, this)) {
                return this[i];
            }
        }
    }
}

/**
 * Perform a shallow clone of this array.
 *
 * @return {Array}
 */
if (Array.prototype.clone === undefined) {
    Array.prototype.clone = function () {
        return this.slice(0, this.length);
    };
}

// And now onto strings!

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

String.prototype.capitalize = function(){
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};