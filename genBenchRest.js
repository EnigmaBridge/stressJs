'use strict';
//
// Script generates flow file for bench-rest load simulator.
// https://github.com/jeffbski/bench-rest#rest-flow
// https://github.com/jeffbski/bench-rest/blob/master/examples/simple.js
// https://www.npmjs.com/package/bench-rest
//

// Read requests from the file
var requestFile = 'requests.txt';
var fs  = require('fs');
var reqDb = fs.readFileSync(requestFile).toString().split('\n');
var i, j, ln=reqDb.length;

var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --site <n>', 'Site - known targets, changing destination')
    .option('-h, --host [host]', 'Target host [https://site1.enigmabridge.com:11180]', 'https://site1.enigmabridge.com:11180')
    .parse(process.argv);
if (program.site !== undefined){
    program.host="https://site"+program.site+".enigmabridge.com:11180";
}

// Randomize requests in the array, concatenate...
var main = [];
for(j=0; j<50; j++) {
    shuffle(reqDb);
    for (i = 0; i < ln; i++) {
        var creq = reqDb[i].trim();
        if (creq.trim() == '') continue;
        main.push({"get": program.host + creq});
    }
}

console.log("'use strict';");
console.log("var flow = { main: ");
console.log(JSON.stringify(main, null, 2));
console.log("};");
console.log("module.exports = flow;");

/**
 * Knuth shuffling.
 *
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}