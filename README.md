# awesomeBoard

## Quick start

For local development, do:

1. Install Node.js.
2. Install MongoDB (don't start it yet).
3. Open /etc/mongodb.conf and set `journal=false`, `nojournal=true` and `smallfiles=true`.
4. Start MongoDB and create a user `awesomeBoard`, password `foobar`, and give it readWrite-role to a database called `awesomeBoard`.
5. Check out this project, go to its directory, and run `npm install`.
6. Run `node server.js`.
