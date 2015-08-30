/**
 * This page shows the results of randomization
 */

const React = require('react');

const TeamView = require('./team.jsx');
const StatsBlock = require('./stats.jsx');

function calculateStats({mob, fed, femmeFatales}) {
    let deception = 0;
    let knowledge = 0;
    let action = 0;

    function testRole(role) {
        if (role.increasesKnowledge) {
            knowledge++;
        } else if (role.increasesDeception) {
            deception++;
        } else if (role.increasesAction) {
            action++;
        }
    }

    mob.forEach(testRole);
    fed.forEach(testRole);
    femmeFatales.forEach(testRole);

    return {deception, knowledge, action};
}

const ResultsView = React.createClass({
    childContextTypes: {
        setZoomImage: React.PropTypes.func.isRequired
    },

    getChildContext() {
        return {
            setZoomImage: this.setZoomImage
        };
    },

    getInitialState() {
        return {
            showZoomImage: null,
            scrollX: 0,
            scrollY: 0,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    setZoomImage(url) {
        this.setState({showZoomImage: url});
    },

    hideZoomImage() {
        this.setState({showZoomImage: null});
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

    propTypes: {
        results: React.PropTypes.shape({
            mob: React.PropTypes.array.isRequired,
            fed: React.PropTypes.array.isRequired,
            femmeFatales: React.PropTypes.array
        }).isRequired
    },

    render() {
        const {showZoomImage, scrollX, scrollY, windowWidth, windowHeight} = this.state;
        const {mob,fed,femmeFatales} = this.props.results;

        const stats = calculateStats(this.props.results);

        const teams = [
            <TeamView key='mob' team={mob} title='The Mob' />,
            <TeamView key='fed' team={fed} title='The Feds' />
        ];

        if (femmeFatales && femmeFatales.length > 0) {
            teams.push(<TeamView key='femmeFatales' team={femmeFatales} title='The Femme Fatales' />);
        }

        let zoomImage;
        if (showZoomImage) {
            const xCenter = windowWidth / 2 - 220;
            const zoomTop = scrollY + 25;
            const zoomLeft = scrollX + xCenter;
            zoomImage = <img className='zoomImage'
                style={{top:zoomTop, left: zoomLeft}}
                onClick={this.hideZoomImage}
                src={showZoomImage}/>;
        };

        return (
            <div className='results'>
                {zoomImage}
                <StatsBlock stats={stats} />
                {teams}
            </div>
        );
    }
});

module.exports = ResultsView;