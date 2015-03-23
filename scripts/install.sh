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

# Set up database
echo "Next up we're populating your database.

For this we need your mysql root password.";
mysql -u root -p -e "
CREATE DATABASE IF NOT EXISTS smashnorge;
CREATE USER 'smashuser' IDENTIFIED BY 'smashpass';
GRANT ALL PRIVILEGES ON smashnorge.* TO 'smashuser'@'localhost' WITH GRANT OPTION;"
echo "> created user and database";
mysql -u smashuser smashnorge < db/smashnorge.sql
echo "> database is populated";

# Create wp-config
echo "Next up is creating a wp-config.";

cp ../wordpress/wp-config-sample.php ../wordpress/wp-config.php

perl -pi -e "s/database_name_here/smashnorge/g" ../wordpress/wp-config.php
perl -pi -e "s/username_here/smashuser/g" ../wordpress/wp-config.php
perl -pi -e "s/password_here/smashpass/g" ../wordpress/wp-config.php
perl -pi -e "s/localhost/127.0.0.1/g" ../wordpress/wp-config.php
rm ../wordpress/wp-config-sample.php

# Finally, let's remove the tmp folder
rm -rf tmp/;

# And we're done!
echo "
We're done! Start your installation with gulp serve:wordpress.
If something is not right with your database connection, check
the generated wp-config.php file";

exit 0;
