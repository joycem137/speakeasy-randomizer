/**
 * This displays all the cards for a single team.
 */
const React = require('react');

const PlayerView = require('./player.jsx');

const TeamView = React.createClass({
    propTypes: {
        team: React.PropTypes.array.isRequired,
        title: React.PropTypes.string.isRequired
    },

    render() {
        const {team, title} = this.props;

        const players = team.map((player,index) =>
            <PlayerView key={player.name + index}
                player={player} />);

        return (
            <div className='team'>
                <div className='teamTitle'>{title}</div>
                <div className='players'>
                    {players}
                </div>
            </div>
        )
    }
});

module.exports = TeamView;