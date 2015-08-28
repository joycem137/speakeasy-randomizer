/**
 * Just the doorway into the app.
 */
require('polyfills');

const React = require('react');

const InputView = require('./ui/input.jsx');

const randomizer = require('./util/randomizer');

const MainApp = React.createClass({
    getInitialState: function() {
        return {
            showResults: false
        };
    },

    generateResults(randomizationOptions) {
        randomizer(randomizationOptions);
    },

    render() {
        return (
            <div>
                <InputView generateResults={this.generateResults} />
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));