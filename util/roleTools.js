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
    getSidedRole(role, side) {
        const sidedRole = {};
        for (let propName in role) {
            if (propName !== 'mob' && propName !== 'fed') {
                sidedRole[propName] = role[propName];
            }
        }

        if (role[side]) {
            for (let propName in role[side]) {
                sidedRole[propName] = role[side][propName];
            }
        }
        return sidedRole;
    }
};