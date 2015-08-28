/**
 * This displays all the cards for a single player.
 */
const React = require('react');

const PlayerView = React.createClass({
    propTypes: {
        player: React.PropTypes.object
    },

    render() {
        const {player} = this.props;

        return (
            <div className='playerContainer'>
                <div className='playerName'>{player.name}</div>
                <img className='playerCard' src={'assets/img/' + player.image}/>
            </div>
        );
    }
});

module.exports = PlayerView;