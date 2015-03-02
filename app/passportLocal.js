// User model
var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = {
	/////////////
	// Sign up //
	/////////////
	signup: new LocalStrategy({
		// Override default username with email.
		usernameField: 'email',
		passwordField: 'password'
	}, function (email, password, done) {

		process.nextTick(function () { // FIXME: What is the point of this?

			User.findOne({
				'local.email': email
			}, function (err, user) {
				if (err) {
					// Got error trying to look up user.
					return done(err);
				}

				if (user) {
					// User already exists.
					return done(null, false, {
						message: 'That email is already taken.'
					});

				} else {
					// Create new user.
					var newUser = new User();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}),

	////////////
	// Log in //
	////////////
	login: new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (email, password, done) {
		User.findOne({
			'local.email': email
		}, function (err, user) {
			if (err) {
				// Got error trying to look up user.
				return done(err);
			}

			if (!user) {
				// Requested user not found.
				return done(null, false, {
					message: 'No such local user found.' // TODO: When non-local logins are added, append "Did you sign up using your Google, Facebook or Twitter account?".
				});
			}

			// Validate password.
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Oops! Wrong password.'
				});
			}

			// Valid user and password.
			return done(null, user);
		});
	})
};
