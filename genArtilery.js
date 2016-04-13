'use strict';
// Read requests from the file
var requestFile = 'requests.txt';
var fs  = require('fs');
var reqDb = fs.readFileSync(requestFile).toString().split('\n');
var i, ln=reqDb.length;

// https://www.npmjs.com/package/artillery
// https://artillery.io/docs/http-reference.html
// $ artillery run hello.json
var aconf = {
    "config": {
    "target": "https://site2.enigmabridge.com:11180",
        "phases": [
            { "duration": 300, "arrivalRate": 50 },
            { "duration": 120, "arrivalRate": 10, "rampTo": 50 },
            { "duration": 60, "arrivalCount": 20 }
        ],
        "statsInterval": 1
},
    "scenarios": []
};

for(i=0; i<ln; i++){
    var creq = reqDb[i].replace('https://site2.enigmabridge.com:11180', '');
    if (creq.trim() == '') continue;
    aconf.scenarios.push({"flow" : [ {"get": {"url": creq}} ]});
}

console.log(JSON.stringify(aconf, null, 2));
