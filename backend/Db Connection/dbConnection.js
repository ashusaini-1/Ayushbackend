const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { URI } = process.env;

exports.dbConnection = async () => {
    try {
            await mongoose.connect(URI)
            .then(console.log("Connected to Database"))

    } catch (error) {
        console.log("Error in Connect to DB : " + error)
    }
}

