if (process.env.NODE_ENV !== "production") require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https:", "wss:"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"],
                styleSrc: ["'self'", "'unsafe-inline'", "https:"],
                imgSrc: ["'self'", "data:", "https:", "blob:"],
                fontSrc: ["'self'", "https:", "data:"],
                workerSrc: ["'self'", "blob:"],
                childSrc: ["'self'", "blob:"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    next();
})


app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)


app.get('/', (req, res) => {
    res.render('home')
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

