var authLocal = require('./passportLocal');

// User model
var User      = require('./models/user');

// expose this function to our app using module.exports
module.exports = function(app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    
    //////////////////
    // User storage //
    //////////////////

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /////////////////
    // Local users //
    /////////////////

    passport.use('local-signup', authLocal.signup);
    passport.use('local-login', authLocal.login);

};

