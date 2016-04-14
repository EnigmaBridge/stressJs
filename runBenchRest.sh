#!/bin/bash
# node genBenchRest.js -s 1 > scriptBenchRest_site1.js
# node genBenchRest.js -s 2 > scriptBenchRest_site2.js
node2 node_modules/bench-rest/bin/bench-rest -n 1000 -c 25 -d 1000 scriptBenchRest_site1.js
