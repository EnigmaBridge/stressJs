'use strict';
// Read requests from the file
var requestFile = 'requests.txt';
var fs  = require('fs');
var reqDb = fs.readFileSync(requestFile).toString().split('\n');
var i, ln=reqDb.length;

var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --site <n>', 'Site - known targets, changing destination')
    .option('-h, --host [host]', 'Target host [https://site1.enigmabridge.com:11180]', 'https://site1.enigmabridge.com:11180')
    .option('-u, --http', 'If set http is used, https otherwise')
    .parse(process.argv);
if (program.site !== undefined){
    var proto = program.http ? 'http' : 'https';
    program.host=proto+"://site"+program.site+".enigmabridge.com:11180";
}

// https://www.npmjs.com/package/artillery
// https://artillery.io/docs/http-reference.html
// $ artillery run hello.json
var aconf = {
    "config": {
    "target": program.host,
        "phases": [
            { "duration": 300, "arrivalRate": 50 },
            { "duration": 300, "arrivalRate": 10, "rampTo": 50 },
            { "duration": 300, "arrivalCount": 20 }
        ],
        "statsInterval": 1
},
    "scenarios": []
};

for(i=0; i<ln; i++){
    var creq = reqDb[i].trim();
    if (creq.trim() == '') continue;
    aconf.scenarios.push({"flow" : [ {"get": {"url": creq}} ]});
}

console.log(JSON.stringify(aconf, null, 2));
