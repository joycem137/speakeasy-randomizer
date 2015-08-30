/**
 * This page shows the results of randomization
 */

const React = require('react');

const StatsBlock = React.createClass({
    propTypes: {
        stats: React.PropTypes.shape({
            deception: React.PropTypes.number.isRequired,
            knowledge: React.PropTypes.number.isRequired,
            action: React.PropTypes.number.isRequired
        }).isRequired
    },

    render() {
        const {deception,knowledge,action} = this.props.stats;
        return (
            <div className="statsBlock">
                <div className="stat">Deception: {deception/2}</div>
                <div className="stat">Knowledge: {knowledge/2}</div>
                <div className="stat">Action: {action/2}</div>
            </div>
        );
    }
});

module.exports = StatsBlock;