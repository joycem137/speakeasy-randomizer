/**
 * This class is our input view.
 */
const React = require('react');

const InputView = React.createClass({
    getInitialState: function() {
        return {
            numberOfPlayers: 10,
            avoidDuplicates: true
        };
    },

    propTypes: {
        generateResults: React.PropTypes.func.isRequired
    },

    handlePlayerChange(event) {
        const {value} = event.target;
        this.setState({numberOfPlayers: value});
    },

    handleDuplicateChange(event) {
        const {checked} = event.target;
        this.setState({avoidDuplicates: value});
    },

    generateResults() {
        const {numberOfPlayers, avoidDuplicates} = this.state;
        this.props.generateResults({numberOfPlayers, avoidDuplicates});
    },

    render() {
        const {numberOfPlayers, avoidDuplicates} = this.state;
        return (
            <div>
                <div className="inputOption">
                    Number of Players:
                    <input type="text"
                        value={numberOfPlayers}
                        onChange={this.handlePlayerChange}

                    />
                </div>
                <div className="inputOption">
                    Avoid Duplicate Roles
                    <input type="checkbox"
                        checked={avoidDuplicates}
                        onChange={this.handleDuplicateChange}
                    />
                </div>
                <button onClick={this.generateResults}>Generate</button>
            </div>
        );
    }
});

module.exports = InputView;