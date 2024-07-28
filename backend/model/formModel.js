const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
    {
        fileName:{type:String},
        title:{type:String , trim:true},
        fileType:{type:String },
        description:{type:String , trim:true},
        filelink:{type:String},
        url:{type:String , trim:true},
        uploadedFileId:{type:String},
        createdAt:{type: Date , default: Date.now}
    }
)
const formData = mongoose.model("formData" , formSchema)
 module.exports = formData ;    