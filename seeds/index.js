const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '68aaf1f118dbe42df2a7c0c5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            price: Math.floor(Math.random() * 20) + 10,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwhocaafr/image/upload/v1756363886/YelpCamp/tem2jm5fel01a3pe6k6x.webp',
                    filename: 'YelpCamp/tem2jm5fel01a3pe6k6x',
                },
                {
                    url: 'https://res.cloudinary.com/dwhocaafr/image/upload/v1756363886/YelpCamp/ggdeabxuumkpipvbjabl.webp',
                    filename: 'YelpCamp/ggdeabxuumkpipvbjabl',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})
