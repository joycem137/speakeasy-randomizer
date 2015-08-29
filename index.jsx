/**
 * Just the doorway into the app.
 */
require('polyfills');

require('./stylesheets/results.css');
require('./stylesheets/input.css');

const React = require('react');

const InputView = require('./ui/input.jsx');
const ResultsView = require('./ui/results.jsx');

const randomizer = require('./util/randomizer');

const MainApp = React.createClass({

    getInitialState() {
        return {};
    },

    generateResults(randomizationOptions) {
        const results = randomizer(randomizationOptions);
        this.setState({results});
    },

    clearResults() {
        this.setState({results:null});
    },

    render() {
        const {results} = this.state;
        let markup;

        if (results) {
            markup = (
                <div>
                    <button onClick={this.clearResults}>Clear Results</button>
                    <br/>
                    <ResultsView results={results} />
                </div>
            );
        } else {
            markup = (
                <InputView generateResults={this.generateResults} />
            );
        }

        return markup;
    }
});

React.render(<MainApp/>, document.getElementById('app'));