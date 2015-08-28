/**
 * Randomizes the cards.
 */

const objectAssign = require('object-assign');

const roles = require('../data/roles');
const passwords = require('../data/passwords');
const roleTools = require('./roleTools');
const numRoles = roles.length;

function formatRole(role, index) {
    let output = (index+1) + ') ' + role.name;

    if (role.isRat) {
        output += ' (Rat)';
    }

    output += ' points: ' + role.points;

    if (role.passwords) {
        output += ' passwords: ' +
            role.passwords
                .map((passwordCard) => passwordCard.blue + '/' + passwordCard.white)
                .join(',');
    } else {
        output += ' passwords: none';
    }

    return output;
}

const passwordTable = {
    5: 2,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 3,
    11: 4,
    12: 4,
    13: 4,
    14: 5,
    15: 5,
    16: 5,
    17: 6,
    18: 6,
    19: 6,
    20: 6
};

function selectPasswords(numberOfPlayers) {
    const teamSize = Math.floor(numberOfPlayers / 2);

    let totalPasswordsNeeded = passwordTable[teamSize] * 2;

    const passwordsSelected = [];
    const passwordMemory = {};

    while (totalPasswordsNeeded > 0) {
        const passwordIndex = Math.floor(Math.random() * passwords.length);
        const card = passwords[passwordIndex];
        const cardKey = card.blue + '/' + card.white;
        if (!passwordMemory[cardKey]) {
            passwordMemory[cardKey] = true;
            passwordsSelected.push(objectAssign({}, card));
            totalPasswordsNeeded--;
        }
    }

    return passwordsSelected;
}

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

function buildSide(roleSelections, side, numRats, sidePasswords) {
    // First we organize our roles.
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

    // Now select our rats
    const numRoles = thisSide.length;
    while(numRats > 0) {
        const roleIndex = Math.floor(Math.random() * numRoles);
        const role = thisSide[roleIndex];
        if (!roleIndex.isRat && !roleIndex.disableRat) {
            role.isRat = true;
            numRats--;
        }
    }

    // Give everybody passwords
    const averagePasswords = Math.floor(numRoles / sidePasswords.length);
    const passwordsAssigned = sidePasswords.map(() => 0);
    let currentPassword = 0;
    const lastPassword = sidePasswords.length - 1;
    thisSide.forEach(function(role) {
        if (role.getsAllPasswords) {
            role.passwords = sidePasswords.map((password) => password);
        } else {
            role.passwords = [sidePasswords[currentPassword]];
        }
        passwordsAssigned[currentPassword]++;
        if (currentPassword !== lastPassword &&
                passwordsAssigned[currentPassword] >= averagePasswords) {
            currentPassword++;
        }
    });

    return thisSide;
}

function randomize({numberOfPlayers}) {
    const passwordsSelected = selectPasswords(numberOfPlayers);
    const roleSelections = selectRoles(numberOfPlayers);

    let numRats = 1;
    if (numberOfPlayers > 30) {
        numRats = 2;
    }

    const numPasswordsPerTeam = passwordsSelected.length / 2;

    const mob = buildSide(roleSelections, 'mob', numRats, passwordsSelected.slice(0, numPasswordsPerTeam));

    const fed = buildSide(roleSelections, 'fed', numRats, passwordsSelected.slice(numPasswordsPerTeam));

    const femmeFatales = [];
    const femmeFataleSpec = roleSelections['Femme Fatale'];
    const numFemmeFatales = femmeFataleSpec ? femmeFataleSpec.number * 2 : 0;

    for (let n = 0; n < numFemmeFatales; n++) {
        const sidedFemme = roleTools.getSidedRole(femmeFataleSpec.role, 'none');
        femmeFatales.push(sidedFemme);
    }

    return {
        femmeFatales,
        mob,
        fed
    }
}

module.exports = randomize;