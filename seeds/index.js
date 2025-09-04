const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < cities.length; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '68b4994ed15b85965ba4097a',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit...',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvyljgvg5/image/upload/v1756822970/YelpCamp/zn5oh39f1dsn6xgowqjw.webp',
                    filename: 'YelpCamp/zn5oh39f1dsn6xgowqjw'
                },
                {
                    url: 'https://res.cloudinary.com/dvyljgvg5/image/upload/v1756822971/YelpCamp/egvzvdoycilgaimn3rwx.jpg',
                    filename: 'YelpCamp/egvzvdoycilgaimn3rwx'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
