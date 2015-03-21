#!/usr/bin/env bash

# This script downloads and installs wordpress for you. Pretty easy!

# Create a working directory
mkdir tmp

# Check if wordpress is installed already
if [ -f ../wordpress/index.php ]; then
    echo -e "Wordpress is already installed!\nDelete your wordpress/ folder for a fresh install.\n";
    echo -e "Exiting...\n";
    rm -rf tmp/
    exit 1; # Return error code 1 if wordpress is already installed
fi




