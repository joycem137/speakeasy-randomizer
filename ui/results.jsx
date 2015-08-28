/**
 * This page shows the results of randomization
 */

const React = require('react');

const TeamView = require('./team.jsx');

const ResultsView = React.createClass({
    propTypes: {
        results: React.PropTypes.shape({
            mob: React.PropTypes.array.isRequired,
            fed: React.PropTypes.array.isRequired,
            femmeFatales: React.PropTypes.array
        }).isRequired
    },

    render() {
        const {mob,fed,femmeFatales} = this.props.results;

        const teams = [
            <TeamView key='mob' team={mob} title='The Mob' />,
            <TeamView key='fed' team={fed} title='The Feds' />
        ];

        if (femmeFatales && femmeFatales.length > 0) {
            teams.push(<TeamView key='femmeFatales' team={femmeFatales} title='The Femme Fatales' />);
        }

        return (
            <div className='results'>
                {teams}
            </div>
        );
    }
});

module.exports = ResultsView;