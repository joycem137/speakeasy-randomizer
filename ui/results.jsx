/**
 * This page shows the results of randomization
 */

const React = require('react');

const PlayerInfo = require('./player.jsx');

const InputView = React.createClass({
    propTypes: {
        results: React.PropTypes.shape({
            mob: React.PropTypes.array.isRequired,
            fed: React.PropTypes.array.isRequired,
            femmeFatales: React.PropTypes.array
        }).isRequired
    },

    render() {
        const {results} = this.props;
        const {mob} = results;

        return (
            <div>
                <PlayerInfo player={mob[0]}/>
            </div>
        );
    }
});

module.exports = InputView;