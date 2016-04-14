#!/bin/bash
# node genArtillery.js -s 1 > scriptArtillery_site1.json
# node genArtillery.js -s 2 > scriptArtillery_site2.json
node ./node_modules/artillery/bin/artillery run scriptArtillery_site1.json
