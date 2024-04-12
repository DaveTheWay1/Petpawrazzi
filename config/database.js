// const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL);
	
// // shortcut to mongoose.connection object
// const db = mongoose.connection;
	
// db.on('connected', function() {
//     console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
// });

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Start the web server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});