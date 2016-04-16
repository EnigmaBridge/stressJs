'use strict';
// Read requests from the file
var requestFile = 'requests.txt';
var fs  = require('fs');
var reqDb = fs.readFileSync(requestFile).toString().split('\n');

// Simple stress test.
// https://www.npmjs.com/package/arete
// https://github.com/capablemonkey/arete
var arete = require('arete');
var request = require('request');
var program = require('commander');

program
    .version('0.0.1')
    .option('-n, --requests <n>', 'Number of requests [100]', '100')
    .option('-c, --concurrency <n>', 'Concurrency [5]', '5')
    .option('-s, --site <n>', 'Site - known targets, changing destination')
    .option('-h, --host [host]', 'Target host [https://site1.enigmabridge.com:11180]', 'https://site1.enigmabridge.com:11180')
    .option('-u, --http', 'If set http is used, https otherwise')
    .parse(process.argv);
console.log("Requests: " + program.requests
    + ", concurrency: " + program.concurrency
    + ", site: " + program.site
    + ", host: " + program.host);

if (program.site !== undefined){
    var proto = program.http ? 'http' : 'https';
    program.host=proto+"://site"+program.site+".enigmabridge.com:11180";
    console.log("Host updated: " + program.host);
}

arete.loadTest({
    name: 'EBtest',
    requests: program.requests,
    concurrentRequests: program.concurrency,
    targetFunction: function(callback) {
        request(program.host + reqDb[Math.floor(Math.random()*reqDb.length)], function(error, response, body) {
            callback(error, body);
        })
    },
    callback: function() {}
});