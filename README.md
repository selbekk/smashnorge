# Smash Norway's website

This is an open sourced project to create a new website for Smash Norway - an organization that's all about playing
Super Smash Bros Melee.

The website is not yet online, but will be found on [smashnorge.no](http://www.smashnorge.no).

## Planned features

If you're curious about the process, we've created a [trello-board](https://trello.com/b/dZ7MlJDa/smash-norge) for you to check out. You'll find all major upcoming
features there.

## We'd love your help!

We're currently doing a lot of setup stuff, but we'll soon be ready to accept pull requests on changes and improvements.
This is a totally voluntary project, so any help is greatly appreciated.

## General setup

This project is built with a nice new build tool called Gulp. It uses Node and NPM, so if you don't have it installed,
head over to their [getting started guide](https://docs.npmjs.com/getting-started/installing-node).

First off - install gulp through NPM:

    npm install gulp -g

Then install all dependencies with

    npm install # installs all build dependencies
    bower install # installs all frontend dependencies

Now you can run the build for the first time:

    gulp

## Wordpress setup

If you want to start Wordpress locally, we've made it easy to get set up.

> ### Note
> Wordpress requires Mysql to run. Make sure you have your mysql server up and running.
> If you don't have ``mysql`` installed, you can install it with ``brew install mysql``.
> Start the server with ``mysql.server start``

First up, run the ``install.sh`` script in the ``scripts/`` folder.

    cd scripts
    ./install.sh

It will guide you through downloading and installing wordpress locally, as well as setting up your local database with a
 mirror of the production database (should be pretty recent).

Once the script has finished running, return to the project root directory and serve the wordpress site:

    gulp serve:wordpress

The is a test user in the database for you to test out

	Username: admin
	Password: testpass

Best of luck!
