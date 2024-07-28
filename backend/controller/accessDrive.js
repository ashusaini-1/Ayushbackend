const DriveModel = require('../model/formModel');
const { v2: cloudinary } = require("cloudinary");
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({
    path: "./.env",
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECERET
});



exports.uploadFile = async (req, res) => {
    try {
        // Ensure req.file is present and is of the correct type
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }

        // Upload file to Cloudinary using buffer
        const uploadResponse = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, 
            (error, result) => {
                if (error) {
                    console.log("Error uploading to Cloudinary:", error);
                    return res.status(500).json({ message: "Error uploading to Cloudinary" });
                }

                console.log("Cloudinary upload response", result);

                // Save upload data to the database
                DriveModel.create({
                    title: req.body.title,
                    description: req.body.description,
                    url:req.body.url,
                    filelink: result.secure_url // Store the secure URL of the uploaded file
                }).then(uploadedData => {
                    console.log("File uploaded successfully!");
                    return res.status(200).json({ success: true, message: "File has been uploaded successfully", data: uploadedData });
                }).catch(dbError => {
                    console.log("Error saving data to database:", dbError);
                    return res.status(500).json({ message: "Error saving data to database" });
                });
            }
        ).end(req.file.buffer);

    } catch (error) {
        console.log("Error in file upload:", JSON.stringify(error, null, 2));
        return res.status(500).json({ message: "Error in file upload" });
    }
};

exports.deleteUploadedFile = async (req, res) => {
    const uploadedFileId = req.params.id;
    try {
        const document = await DriveModel.findByIdAndDelete(uploadedFileId);

        if (!document) {
            return res.status(404).json({ message: "File not found" });
        }

        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("Delete file error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getAlldata = async (req, res) => {
    try {

        const allData = await DriveModel.find();
        if (!allData) {
            return res.json({ status: 400, message: "No data available on your account" })
        } else {
            return res.json({
                status: 200,
                success: true,
                All_Available_Details: allData
            })
        }

    } catch (error) {
        console.log("Error Getting Details : ", error)
        return res.json({ status: 500, message: "Error in getting data : " })
    }
}






exports.getSingledata = async (req, res) => {
    try {
        const id=req.params.id;
        const allData = await DriveModel.findById(id);
        if (!allData) {
            return res.json({ status: 400, message: "No data available " })
        } else {
            return res.json({
                status: 200,
                success: true,
                allData
            })
        }

    } catch (error) {
        console.log("Error Getting Details : ", error)
        return res.json({ status: 500, message: "Error in getting data : " })
    }
}


