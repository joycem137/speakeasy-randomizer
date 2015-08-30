/**
 * This is an image that pops up over everything and
 * tries to center itself.
 */
const React = require('react');

const ResultsView = React.createClass({
    propTypes: {
        src: React.PropTypes.string.isRequired,
        onHide: React.PropTypes.func
    },

    hideZoomImage() {
        if (this.props.onHide) {
            this.props.onHide();
        }
    },

    getInitialState() {
        return {
            scrollX: 0,
            scrollY: 0,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    componentDidMount() {
        window.addEventListener('scroll', this.handleWindowChange);
        window.addEventListener('resize', this.handleWindowChange);
    },

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowChange);
        window.removeEventListener('resize', this.handleWindowChange);
    },

    handleWindowChange() {
        const {scrollX, scrollY,innerWidth, innerHeight} = window;
        this.setState({
            scrollX,
            scrollY,
            windowWidth: innerWidth,
            windowHeight: innerHeight
        });
    },

    render() {
        const {scrollX, scrollY, windowWidth, windowHeight} = this.state;
        const {src} = this.props;

        const xCenter = windowWidth / 2 - 220;
        const zoomTop = scrollY + 25;
        const zoomLeft = scrollX + xCenter;

        return (
            <img className='zoomImage'
                style={{top:zoomTop, left: zoomLeft}}
                onClick={this.hideZoomImage}
                src={src}/>
        );
    }
});

module.exports = ResultsView;