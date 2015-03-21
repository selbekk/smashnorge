#!/usr/bin/env bash

# This script exports the current state of the database to the db-folder

echo "Ready to export your local database? Remember, this is the database that is available on the test computers.

Press enter to export."
read -n 1

mysqldump -u -p smashnorge > db/smashnorge.sql

echo "SQL exported to db/smashnorge.sql."