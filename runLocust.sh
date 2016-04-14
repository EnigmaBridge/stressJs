#!/bin/bash
locust --host=https://site2.enigmabridge.com:11180
echo "In order to access web interface on your client, do: ssh -L 8089:127.0.0.1:8089 locustServer"
echo "Then go to http://localhost:8089"
