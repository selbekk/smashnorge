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

## Initial setup

This project is built with a nice new build tool called Gulp. It uses Node and NPM, so if you don't have it installed,
head over to their [getting started guide](https://docs.npmjs.com/getting-started/installing-node).

First off - install gulp through NPM:

    npm install gulp -g

Then install all dependencies with

    npm install # installs all build dependencies
    bower install # installs all frontend dependencies

And we're done! To start a test server, simply run

    gulp serve

The website is currently being designed as a general website with a few different templates. Since we're going to make a
Wordpress template out of this, we have quite a few template files to create before we start wordpressifying this