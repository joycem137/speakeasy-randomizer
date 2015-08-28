/**
 *
 */
module.exports = {
    // Return a named role
    getRole(name, roles) {
        return roles.find((role) => role.name === name);
    },

    // Return a unique key for this role.
    getKey(role) {
        if (role.name) {
            return role.name;
        } else {
            return role.mob.name + '/' + role.fed.name;
        }
    },

    // Return a roll specific to a side
    getSidedRole(side, role) {
        const sidedRole = {};
        for (let propName in role) {
            if (propName !== 'mod' && propName !== 'fed') {
                sidedRole[propName] = role[propName];
            }
        }

        for (let propName in role[side]) {
            sidedRole[propName] = role[propName];
        }
    }
};