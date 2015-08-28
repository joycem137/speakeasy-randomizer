/**
 * Just the doorway into the app.
 */
require('polyfills');
const React = require('react');

const roles = require('./data/roles');
const roleTools = require('./util/roleTools');
const numRoles = roles.length;

function selectRoles(numberOfPlayers) {
    const rolesSelected = {};
    const femmeFatale = "Femme Fatale";
    let rolesRemaining = numberOfPlayers;
    if (rolesRemaining < 10) {
        rolesRemaining = 10;
    }
    const isEven = rolesRemaining % 2 === 0;
    while(rolesRemaining > 1) {
        const roleIndex = Math.floor(Math.random() * numRoles);
        const newRole = roles[roleIndex];
        const roleKey = roleTools.getKey(newRole);
        if (isEven || roleKey !== femmeFatale) {
            if (!rolesSelected[roleKey]) {
                rolesSelected[roleKey] = {
                    role: newRole,
                    number: 1
                };
                rolesRemaining = rolesRemaining - 2;
            } else if (rolesSelected[roleKey].number < newRole.maxPair) {
                rolesSelected[roleKey].number++;
                rolesRemaining = rolesRemaining - 2;
            }
        }
    }

    if (rolesRemaining === 1) {
        rolesSelected[femmeFatale] = {
            role: roleTools.getRole(femmeFatale, roles),
            number: 0.5
        };
    }

    return rolesSelected;
}

function buildSide(roleSelections, side, numberOfPlayers) {
    const thisSide = [];
    for (let roleKey in roleSelections) {
        const roleSpec = roleSelections[roleKey];
        if (roleSpec.role.name !== 'Femme Fatale') {
            for (let num = 0; num < roleSpec.number; num++) {
                const sidedRole = roleTools.getSidedRole(roleSpec.role, side);
                thisSide.push(sidedRole);
            }
        }
    }

    let numRats = 1;
    if (numberOfPlayers > 30) {
        numRats = 2;
    }

    while(numRats > 0) {
        const roleIndex = Math.floor(Math.random() * thisSide.length);
        const role = thisSide[roleIndex];
        if (!roleIndex.isRat && !roleIndex.disableRat) {
            role.isRat = true;
            numRats--;
        }
    }

    return thisSide;
}

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

        const roleSelections = selectRoles(numberOfPlayers);

        const mobSide = buildSide(roleSelections, 'mob', numberOfPlayers);
        const fedSide = buildSide(roleSelections, 'fed', numberOfPlayers);

        const femmeFatales = [];
        const femmeFataleSpec = roleSelections['Femme Fatale'];
        const numFemmeFatales = femmeFataleSpec ? femmeFataleSpec.number * 2 : 0;
        for (let n = 0; n < numFemmeFatales; n++) {
            const sidedFemme = roleTools.getSidedRole(femmeFataleSpec.role, 'none');
            femmeFatales.push(sidedFemme);
        }

        function formatRole(role, index) {
            let output = (index+1) + ') ' + role.name;

            if (role.isRat) {
                output += ' (Rat)';
            }

            return output;
        }

        const mobNames = mobSide.map(formatRole).join('\n');
        const fedNames = fedSide.map(formatRole).join('\n');
        const femmeFataleNames = femmeFatales.map(formatRole).join('\n');

        console.log('Mob');
        console.log(mobNames);

        console.log('Fed');
        console.log(fedNames);

        console.log('Femme Fatales');
        console.log(femmeFataleNames);
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