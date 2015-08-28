/**
 * This class is our input view.
 */
const React = require('react');

const InputView = React.createClass({
    getInitialState: function() {
        return {
            numberOfPlayers: 10
        };
    },

    propTypes: {
        generateResults: React.PropTypes.func.isRequired
    },

    handleChange(event) {
        let value = event.target.value;
        this.setState({numberOfPlayers: value});
    },

    generateResults() {
        const {numberOfPlayers} = this.state;
        this.props.generateResults({numberOfPlayers});
    },

    render() {
        const {numberOfPlayers} = this.state;
        return (
            <div>
                Number of Players:
                <input type="text"
                    value={numberOfPlayers}
                    onChange={this.handleChange}

                />
                <button onClick={this.generateResults}>Generate</button>
            </div>
        );
    }
});

module.exports = InputView;