/**
 * Just the doorway into the app.
 */
require('polyfills');

const React = require('react');

const randomizer = require('./util/randomizer');

const MainApp = React.createClass({
    getInitialState: function() {
        return {
            numberOfPlayers: 10,
            showResults: false
        };
    },

    handleChange(event) {
        let value = event.target.value;
        this.setState({numberOfPlayers: value});
    },

    randomize() {
        const {numberOfPlayers} = this.state;
        randomizer(numberOfPlayers);
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
                <button onClick={this.randomize}>Randomize</button>
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));