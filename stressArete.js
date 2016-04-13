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

arete.loadTest({
    name: 'EBtest',
    requests: 10000,
    concurrentRequests: 5,
    targetFunction: function(callback) {
        request('https://site1.enigmabridge.com:11180' + reqDb[Math.floor(Math.random()*reqDb.length)], function(error, response, body) {
            callback(error, body);
        })
    },
    callback: function() {}
});