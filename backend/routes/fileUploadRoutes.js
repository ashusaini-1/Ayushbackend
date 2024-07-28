const express = require('express');
const driveupload = express.Router();
const uploading = require('../middleware/multer')
const { validateInput } = require('../middleware/validate')

const { uploadFile , deleteUploadedFile , getAlldata,getSingledata} = require('../controller/accessDrive')
const mediaHandler=require('../middleware/multer')

//Routes for google drive
driveupload.post('/uploadfile', mediaHandler.single('file'), uploadFile);
driveupload.route("/deletefile/:id").delete(deleteUploadedFile)
driveupload.route("/alldata").get(getAlldata)
driveupload.route("/get_data/:id").get(getSingledata)

module.exports = driveupload