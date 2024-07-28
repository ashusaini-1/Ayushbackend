const { google } = require ('googleapis')
const dotenv = require ('dotenv');

dotenv.config();
const {clientID , clientSecret , Refresh_token } = process.env;

const oauth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    Refresh_token
)

oauth2Client.setCredentials({refresh_token: Refresh_token})

exports.drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})