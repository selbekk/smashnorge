#!/usr/bin/env bash

# This script imports a given sql file into the database

echo "So I heard you want to import a file to the database?
We will delete the entire database and use whatever you
give us as the new database.

Press enter to continue.";

read -n 1

mysql smashnorge "DROP DATABASE IF EXISTS smashnorge";
mysql smashnorge "CREATE DATABASE smashnorge";
mysql -u -p smashnorge < $1;

echo "Import completed.";