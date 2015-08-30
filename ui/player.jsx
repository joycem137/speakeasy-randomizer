/**
 * This displays all the cards for a single player.
 */
const React = require('react');

const specialCards = require('../data/specialCards');

const imageRoot = 'assets/img/';

const ZoomableImage = require('./zoomableImage.jsx');

const PlayerView = React.createClass({
    propTypes: {
        player: React.PropTypes.object
    },

    render() {
        const {player} = this.props;
        const passwords = player.passwords;
        let extraCards = [];

        if (passwords && passwords.length > 0) {
            extraCards = passwords
                .map((passwordCard) => passwordCard.image);
        }

        if (player.isRat) {
            extraCards.push(specialCards.rat.image);
        }

        if (player.hasWhiskey) {
            extraCards.push(specialCards.whiskeyShipment.image);
        }

        for (let n = 0; n < player.points; n++) {
            extraCards.push(specialCards.point.image);
        }

        const extraCardMarkup = extraCards
            .map((url) => <ZoomableImage className='extraCard' src={imageRoot + url} />);

        return (
            <div className='playerContainer'>
                <ZoomableImage className='playerCard playerData' src={imageRoot + player.image}/>
                <div className='extraCards playerData'>
                    {extraCardMarkup}
                </div>
            </div>
        );
    }
});

module.exports = PlayerView;