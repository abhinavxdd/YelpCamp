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

// Function to generate random coordinates near a city
const getRandomNearbyCoordinates = (baseLat, baseLng) => {
    // Add random offset within ~20km radius
    const latOffset = (Math.random() - 0.5) * 0.2; // ~0.1 degrees = ~10km
    const lngOffset = (Math.random() - 0.5) * 0.2;
    
    return [
        baseLng + lngOffset,
        baseLat + latOffset
    ];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    console.log('Deleted existing campgrounds');
    
    // Create 200 campgrounds
    for (let i = 0; i < 200; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const city = cities[randomCityIndex];
        const price = Math.floor(Math.random() * 20) + 10;
        
        // Generate random coordinates near the city
        const coordinates = getRandomNearbyCoordinates(city.latitude, city.longitude);
        
        const camp = new Campground({
            author: '68b4994ed15b85965ba4097a',
            location: `${city.city}, ${city.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: coordinates
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
        
        // Progress indicator
        if ((i + 1) % 50 === 0) {
            console.log(`Created ${i + 1} campgrounds...`);
        }
    }
    
    console.log('Successfully created 200 campgrounds!');
};

seedDB().then(() => {
    mongoose.connection.close();
});
