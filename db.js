const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(data => {
    console.log('MongoDB Connected Sucessfully');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err);
});

