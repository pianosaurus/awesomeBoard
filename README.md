awesomeBoard
============

Quick start
-----------

For local development, do:

1.  Install Node.js.
2.  Install MongoDB (don't start it yet).
3.  Open /etc/mongodb.conf and set `journal=false`, `nojournal=true` and
    `smallfiles=true`. You can also do this locally.
4.  Start MongoDB and create a user `awesomeBoard`, password `foobar`,
    and give it readWrite-role to a database called `awesomeBoard`
    (first `use awesomeBoard`, then
    `db.createUser({ user: "awesomeBoard", pwd: "foobar", roles: ["readWrite"] })`).
5.  Check out this project, go to its directory, and run `npm install`.
6.  Run `bower install`. You may have to install bower first using npm.
7.  Run `node server.js`.
