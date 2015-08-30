/**
 * This is an image that has a link to another image on
 * context that it can show.
 */
const React = require('react');

const ZoomableImage = React.createClass({
    contextTypes: {
        setZoomImage: React.PropTypes.func.isRequired
    },

    propTypes: {
        src: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },

    handleClick(event) {
        const {src} = this.props;
        this.context.setZoomImage(src);
    },

    render() {
        const {src, className} = this.props;
        return (
            <img className={className}
                onClick={this.handleClick}
                src={src} />
        );
    }
});

module.exports = ZoomableImage;