/**
 * This page shows the results of randomization
 */

const React = require('react');

const TeamView = require('./team.jsx');
const StatsBlock = require('./stats.jsx');
const ZoomImage = require('./ZoomImage.jsx');

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
            showZoomImage: null
        };
    },

    setZoomImage(url) {
        this.setState({showZoomImage: url});
    },

    hideZoomImage() {
        this.setState({showZoomImage: null});
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
            zoomImage = <ZoomImage
                onHide={this.hideZoomImage}
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