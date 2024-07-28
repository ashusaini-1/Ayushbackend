const path = require('path');
const multer = require('multer');

// Set up storage engine
const storage = multer.memoryStorage();


// Initialize multer with the storage engine
const mediaHandler = multer({ storage: storage });

module.exports = mediaHandler;
