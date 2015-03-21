#!/usr/bin/env bash

# This script downloads and installs wordpress for you. Pretty easy!

echo -e "
Welcome to the installer for the Smash Norge wordpress theme.

For this to work, you have to have a mysql server up and running, as well as PHP installed.

If this script hangs at any point, make sure to delete the scripts/tmp folder before you continue.

Press enter to start, or press ctrl+c to quit.
";
read -n 1
echo -e "OKAY THEN! Let's begin...\n";


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

echo -e "Downloading Wordpress. This might take some time, depending on your internet connection\n";
curl -# --output tmp/wordpress.tar.gz https://wordpress.org/latest.tar.gz
echo -e "\nDownload complete";

# Unzip the content to the wordpress-folder
echo -e "Unzipping wordpress installation into wordpress/ folder"
tar -xzf tmp/wordpress.tar.gz -C ../
echo -e "...and now that's done too!";

# Create wp-config
echo -e "Next up is creating a wp-config.
Here we need some help from you, since you need to specify some database credentials.

First - your database username: ";
read DB_USERNAME
echo -e "Nice, $DB_USERNAME it is.
Next up, your database password: "
read -s DB_PASSWORD
echo -e "Got it. And we're just going to assume that the host is localhost, because reasons.

Now we're going to create a wp-config.php file for you, with this info in it."

cp ../wordpress/wp-config-sample.php ../wordpress/wp-config.php

perl -pi -e "s/database_name_here/super-smash/g" ../wordpress/wp-config.php
perl -pi -e "s/username_here/$DB_USERNAME/g" ../wordpress/wp-config.php
perl -pi -e "s/password_here/$DB_PASSWORD/g" ../wordpress/wp-config.php
rm ../wordpress/wp-config-sample.php
echo -e "That went smooth!"

# Set up database
echo -e "Next up we're populating your database";
mysql -p -e "CREATE DATABASE IF NOT EXISTS \`super-smash\`;"
mysql "super-smash" < db/smashnorge_2015-03-21.sql

# Finally, let's remove the tmp folder
rm -rf tmp/;

# And we're done!
echo "
We're done! Start your installation with gulp serve:wordpress. "

exit 0;

