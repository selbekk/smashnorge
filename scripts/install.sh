#!/usr/bin/env bash

# This script downloads and installs wordpress for you. Pretty easy!

echo "
Welcome to the installer for the Smash Norge wordpress theme.

For this to work, you have to have a mysql server up and running, as well as PHP installed.

If this script hangs at any point, make sure to delete the scripts/tmp folder before you continue.

Press enter to start, or press ctrl+c to quit.";
read -n 1
echo "OKAY THEN! Let's begin...";


# Create a working directory
mkdir tmp

# Check if wordpress is installed already
if [ -f ../wordpress/index.php ]; then
    echo "Wordpress is already installed!
    Delete your wordpress/ folder for a fresh install.";
    echo "Exiting...";
    rm -rf tmp/
    exit 1; # Return error code 1 if wordpress is already installed
fi

# Go ahead and download the latest version of wordpress

echo "Downloading Wordpress. This might take some time, depending on your internet connection
";
curl -# --output tmp/wordpress.tar.gz https://wordpress.org/latest.tar.gz
echo "
Download complete";

# Unzip the content to the wordpress-folder
echo "Unzipping wordpress installation into wordpress/ folder"
tar -xzf tmp/wordpress.tar.gz -C ../
echo "...and now that's done too!";

# Create wp-config
echo "Next up is creating a wp-config.
Here we need some help from you, since you need to specify some database credentials.

First - your database username (can be blank): ";
read DB_USERNAME
echo "Nice, $DB_USERNAME it is.
Next up, your database password (can also be blank): "
read DB_PASSWORD
echo "Got it. And we're just going to assume that the host is localhost, because reasons.

Now we're going to create a wp-config.php file for you, with this info in it."

cp ../wordpress/wp-config-sample.php ../wordpress/wp-config.php

perl -pi -e "s/database_name_here/smashnorge/g" ../wordpress/wp-config.php
perl -pi -e "s/username_here/$DB_USERNAME/g" ../wordpress/wp-config.php
perl -pi -e "s/password_here/$DB_PASSWORD/g" ../wordpress/wp-config.php
rm ../wordpress/wp-config-sample.php
echo "That went smooth!"

# Set up database
echo "Next up we're populating your database";
mysql -p -e "CREATE DATABASE IF NOT EXISTS smashnorge;"
mysql smashnorge < db/smashnorge_2015-03-21.sql

# Finally, let's remove the tmp folder
rm -rf tmp/;

# And we're done!
echo "
We're done! Start your installation with gulp serve:wordpress.
If something is not right with your database connection, check
the generated wp-config.php file";

exit 0;

