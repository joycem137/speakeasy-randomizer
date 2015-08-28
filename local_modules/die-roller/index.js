/**
 * Roll a number of dice with a number of sides.
 *
 * If only one argument is provided, it is assumed to be
 * the number of 6 sided dice.
 *
 * If no arguments are provided, a single d6 is rolled.
 *
 * Returns an array containing all of the die rolls.
 */
module.exports = function(numberOfDice, numberOfSides) {
    var rolls = [],
        latestResult,
        totalResult = 0;
    // Normalize the request, first.
    if (numberOfSides === undefined) {
        numberOfSides = 6;
    }

    if (numberOfDice === undefined) {
        numberOfDice = 1;
    }

    for (var i = 0; i < numberOfDice; i++) {
        latestResult = Math.floor(Math.random() * numberOfSides) + 1;
        rolls.push(latestResult);
        totalResult += latestResult;
    }

    return {
        rolls: rolls,
        total: totalResult
    }
};
