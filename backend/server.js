const express = require('express')
const path = require('path');
const driveupload = require('./routes/fileUploadRoutes')
const { dbConnection } = require('./Db Connection/dbConnection')
const dotenv = require("dotenv");
const cors=require('cors')

dotenv.config();
const { PORT } = process.env;
const app = express();
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

dbConnection();

app.use("/drive", driveupload)

app.get("/", (req,res) => {
    res.send("Hello this is the home page of this google drive api")
})

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`)
})







