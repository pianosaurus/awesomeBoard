// Use this function as middleware when authentication is needed.
function isLoggedIn(req, res, next) {
	console.log('isLoggedIn');
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
}

module.exports = function (app, passport, serverConfig) {
	// Route to test if the user is logged in or not.
	app.get('/loggedin', function (req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	////////////////
	// Login form //
	////////////////
	app.post('/login', function (req, res, next) {
		passport.authenticate('local-login', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).send(info.message);
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.send(req.user);
			});
		})(req, res, next);
	});

	//////////////////
	// Sign up form //
	//////////////////
	app.post('/signup', function (req, res, next) {
		passport.authenticate('local-signup', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).send(info.message);
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.send(req.user);
			});
		})(req, res, next);
	});

	//////////////////
	// Log out form //
	//////////////////
	app.post('/logout', function (req, res) {
		// TODO: Performing action on GET. This allows cross-site logouts.
		req.logout();
		res.sendStatus(200);
	});

	// All other routes should redirect to /
	app.route('/*').get(function (req, res) {
		res.sendFile('index.html', {
			root: __dirname + '/../public',
		});
	});
};
