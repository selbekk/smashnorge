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

# Go ahead and download the latest version of wordpress

echo "Downloading Wordpress. This might take some time, depending on your internet connection";
curl --silent --output tmp/wordpress.tar.gz https://wordpress.org/latest.tar.gz
echo "Download complete";

# Unzip the content to the wordpress-folder

# Create wp-config

# Set up database

# Finally, let's remove the tmp folder
rm -rf tmp/;

# And we're done!
exit 0;

