#!/bin/bash

DEFAULT_PORT=8000

# Check if a port number is provided as an argument
if [ -z "$1" ]; then
  echo "No port number provided. Using default port: $DEFAULT_PORT"
  PORT=$DEFAULT_PORT
else
  PORT=$1
fi

# Go inside the submodule containing the Python server start script
if ! cd JSAV-exercises; then
  echo "Failed to change directory to JSAV-exercises."
  echo "Make sure that the submodule is cloned and that you call this script from testbench/."
  exit 1
fi

# Start the Python server with the provided port number
python3 start_testbench.py $PORT