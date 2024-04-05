const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

                // instance of the class GoogleStrategy which takes 2 arguemetns; an object and a function
passport.use(new GoogleStrategy(
    // Configuration object
    {
        // we must name these like the way they are in the below bc that is how passport wants us to
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        // the callback is how it knows how to get back in touch with us after authentication from google
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function...
    // Marking a function as an async function allows us
    // to consume promises using the await keyword

    // accessToken would be used to access google users resources but we dont use that so we ignore as well as refresh token 
    async function (accessToken, refreshToken, profile, cb) {
        // When using async/await  we use a
        // try/catch block to handle an error
        try {
            // A user has logged in with OAuth...
            let user = await User.findOne({ googleId: profile.id });
            // Existing user found, so provide it to passport
            if (user) return cb(null, user);
            // We have a new user via OAuth!
            // these displayName, id, emails, photos comes from google and how they refer to these property value
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user._id); // this takes care of what we put in the sesssion. // null is for no error ? still confused about that
});

passport.deserializeUser(async function (userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
});