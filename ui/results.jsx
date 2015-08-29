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
    propTypes: {
        results: React.PropTypes.shape({
            mob: React.PropTypes.array.isRequired,
            fed: React.PropTypes.array.isRequired,
            femmeFatales: React.PropTypes.array
        }).isRequired
    },

    render() {
        const {mob,fed,femmeFatales} = this.props.results;

        const stats = calculateStats(this.props.results);

        const teams = [
            <TeamView key='mob' team={mob} title='The Mob' />,
            <TeamView key='fed' team={fed} title='The Feds' />
        ];

        if (femmeFatales && femmeFatales.length > 0) {
            teams.push(<TeamView key='femmeFatales' team={femmeFatales} title='The Femme Fatales' />);
        }

        return (
            <div className='results'>
                <StatsBlock stats={stats} />
                {teams}
            </div>
        );
    }
});

module.exports = ResultsView;