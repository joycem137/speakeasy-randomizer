/**
 * Just the doorway into the app.
 */
const React = require('react');

const MainApp = React.createClass({
    getInitialState: function() {
        return {value: 10};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render() {
        const {value} = this.state;
        return (
            <div>
                Number of Players:
                <input type="text" value={value} onChange={this.handleChange} />
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));