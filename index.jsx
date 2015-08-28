/**
 * Just the doorway into the app.
 */
require('polyfills');
const React = require('react');

const roles = require('./data/roles');
const roleTools = require('./roleTools');
const numRoles = roles.length;

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
        const rolesSelected = {};
        const femmeFatale = "Femme Fatale";
        let rolesRemaining = this.state.numberOfPlayers;
        if (rolesRemaining < 10) {
            rolesRemaining = 10;
        }
        const isEven = rolesRemaining % 2 === 0;
        while(rolesRemaining > 1) {
            const roleIndex = Math.floor(Math.random() * numRoles) + 1;
            const newRole = roles[roleIndex];
            const roleKey = roleTools.getKey(newRole);
            if (isEven || roleKey !== femmeFatale) {
                if (!rolesSelected[roleKey]) {
                    rolesSelected[roleKey] = {
                        role: newRole,
                        number: 2
                    };
                    rolesRemaining = rolesRemaining - 2;
                } else if (rolesSelected[roleKey].number / 2 < newRole.maxPair) {
                    rolesSelected[roleKey].number++;
                    rolesRemaining = rolesRemaining - 2;
                }
            }
        }

        if (rolesRemaining === 1) {
            rolesSelected[femmeFatale] = {
                role: roleTools.getRole(femmeFatale, roles),
                number: 1
            };
        }

        console.log('result');
        console.log(JSON.stringify(rolesSelected));
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