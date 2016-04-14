#!/bin/bash
#
# If server has too low node JS version.
#
#1) Clear NPM's cache:
sudo npm cache clean -f
# 2) Install a little helper called 'n'
sudo npm install -g n
# 3) Install latest stable NodeJS version
sudo n stable
# 4) ln it
#ln -s /usr/local/n/versions/node/5.10.1/bin/node /bin/node2
