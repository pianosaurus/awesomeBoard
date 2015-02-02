function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    // Not authenticated, so redirect to the front page.
    res.redirect('/');
}

module.exports = function(app, passport, serverConfig) {

    ///////////////
    // Home page //
    ///////////////
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            server: serverConfig
        });
    });

    ////////////////
    // Login form //
    ////////////////
    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            server:  serverConfig,
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    //////////////////
    // Sign up form //
    //////////////////
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {
            server:  serverConfig,
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    ////////////////////////////
    // Logged in profile page //
    ////////////////////////////
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            server: serverConfig,
            user:   req.user
        });
    });

    //////////////////
    // Log out form //
    //////////////////
    app.get('/logout', function(req, res) {
        // TODO: Performing action on GET. This allows cross-site logouts.
        req.logout();
        res.redirect('/');
    });
};
