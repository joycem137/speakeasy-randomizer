/**
 * This page shows the results of randomization
 */

const React = require('react');

const InputView = React.createClass({
    propTypes: {
        results: React.PropTypes.shape({
            mob: React.PropTypes.array.isRequired,
            fed: React.PropTypes.array.isRequired,
            femmeFatales: React.PropTypes.array
        }).isRequired
    },

    render() {
        return <div/>;
    }
});

module.exports = InputView;