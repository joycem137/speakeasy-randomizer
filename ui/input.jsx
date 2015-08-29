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
        this.setState({avoidDuplicates: checked});
    },

    generateResults() {
        const {numberOfPlayers, avoidDuplicates} = this.state;
        this.props.generateResults({numberOfPlayers, avoidDuplicates});
    },

    render() {
        const {numberOfPlayers, avoidDuplicates} = this.state;
        return (
            <div className="inputOptions">
                <div className="inputOption">
                    <div className="inputLabel">Number of Players:</div>
                    <input className="playerInput" type="text"
                        value={numberOfPlayers}
                        onChange={this.handlePlayerChange}

                    />
                </div>
                <div className="inputOption">
                    <div className="inputLabel">Avoid Duplicate Roles:</div>
                    <div className="inputCheck">
                        <input type="checkbox" value="None" id="avoidDuplicates"
                            name="check"
                            checked={avoidDuplicates}
                            onChange={this.handleDuplicateChange}
                        />
                        <label htmlFor="avoidDuplicates"></label>
                    </div>
                </div>
                <button onClick={this.generateResults}>Generate Roles</button>
            </div>
        );
    }
});

module.exports = InputView;