/*
 * drawTools
 */
module.exports = {
    /**
     * Create a regular path of the indicated spec.
     *
     * This just returns an array of points that can be used
     * in a "movePath" function later, if desired.
     *
     * @param context
     * @param spec
     */
    createRegularPolygon: function(spec) {
        var numberOfSides = spec.numberOfSides,
            size = spec.size,
            xCenter = spec.xCenter,
            yCenter = spec.yCenter;

        var pointSet = [];

        pointSet.push({
            x: xCenter +  size * Math.cos(0),
            y: yCenter +  size * Math.sin(0)
        });

        for (var i = 1; i < numberOfSides;i += 1) {
            pointSet.push({
                x: xCenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
                y: yCenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
            });
        }

        return pointSet;
    },

    /**
     * Convert a rectangle definition to a path.
     *
     * @param rectangle
     * @return {Array}
     */
    createRectangle: function(rectangle) {
        return [
            {x: rectangle.x, y: rectangle.y},
            {x: rectangle.x + rectangle.width, y: rectangle.y},
            {x: rectangle.x + rectangle.width, y: rectangle.y + rectangle.height},
            {x: rectangle.x, y: rectangle.y + rectangle.height}
        ];
    },

    /**
     *
     * @param context
     */
    movePath: function(context, path) {
        if (!(path instanceof Array)) {
            path = this.createRectangle(path);
        }

        context.beginPath();
        context.moveTo(path[0].x, path[0].y);
        path.forEach(function(point) {
            context.lineTo(point.x, point.y);
        });
        context.closePath();
    },

    /**
     * convenience method for stroking.
     */
    strokePath: function(context, path) {
        this.movePath(context,path);
        context.stroke();
    },

    /**
     * convenience method for filling.
     */
    fillPath: function(context, path) {
        this.movePath(context,path);
        context.fill();
    },

    /**
     * Return the center point of a given shape.
     * @param shape
     */
    findCenter: function(shape) {
        var sumX = 0;
        var sumY = 0;
        var numPoints = shape.length;
        shape.forEach(function(point) {
            sumX += point.x;
            sumY += point.y;
        });

        return {
            x: sumX / numPoints,
            y: sumY / numPoints
        }
    },

    /**
     * Returns true if the provided point is in the provided shape.
     *
     * Use rectangles for faster service!
     *
     * @param point
     * @param path
     * @return {Boolean}
     */
    pointInShape: function(point, path) {
        if (!(path instanceof Array)) {
            // We can be FAST with rectangles!
            return (point.x >= path.x &&
                point.x <= path.x + path.width &&
                point.y >= path.y &&
                point.y <= path.y + path.height);
        }

        // *sigh* We have to be slow with other polygons.
        var minX = path[ 0 ].x;
        var maxX = path[ 0 ].x;
        var minY = path[ 0 ].y;
        var maxY = path[ 0 ].y;
        var q;

        for ( var index = 1 ; i < path.length ; index++ ) {
            q = path[ index ];
            minX = Math.min( q.x, minX );
            maxX = Math.max( q.x, maxX );
            minY = Math.min( q.y, minY );
            maxY = Math.max( q.y, maxY );
        }

        if ( point.x < minX || point.x > maxX || point.y < minY || point.y > maxY )
        {
            return false;
        }

        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        var inside = false;
        for ( var i = 0, j = path.length - 1 ; i < path.length ; j = i++ )
        {
            if ( ( path[ i ].Y > point.y ) != ( path[ j ].Y > point.y ) &&
                point.x < ( path[ j ].X - path[ i ].X ) * ( point.y - path[ i ].Y ) / ( path[ j ].Y - path[ i ].Y ) + path[ i ].X )
            {
                inside = !inside;
            }
        }

        return inside;
    }
};