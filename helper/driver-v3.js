const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
exports.uploadFileToDriver = (path_image, name_image, mimeType) => {
 return new Promise((resolve, reject) => {
  fs.readFile('credentials.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    // authorize(JSON.parse(content), listFiles);
    try {
      let auth = await authorize(JSON.parse(content));
      // let folderId = await createFolder(auth);
      // listFiles(auth);
      let fileId = await uploadFile(auth, path_image, name_image, mimeType);
      let url_image = await getFile(auth, fileId);
      resolve(url_image);
    } catch (error) {
      console.log(error);
    }
  });
 })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  return new Promise((resolve, reject) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      // callback(oAuth2Client);
      resolve(oAuth2Client);
    });
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}
function uploadFile(auth, path_image, name_image, mimeType) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth });
    const folderId = "1N1BQ5KNqV0PoZZ5BDd7xB_UfJpYsMvw8";
    var fileMetadata = {
      'name': name_image,
      parents: ["1N1BQ5KNqV0PoZZ5BDd7xB_UfJpYsMvw8"]
    };
    var media = {
      mimeType: mimeType,
      body: fs.createReadStream(path_image)
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, res) {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        resolve(res.data.id);
      }
    });
  })
}
function createFolder(auth) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
      'name': 'I-social',
      'mimeType': 'application/vnd.google-apps.folder'
    };
    drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('Folder Id: ', file.id);
        resolve(file.id);
      }
    });
  })
}
function getFile(auth, fileId) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      // console.log(res.data);
      resolve(res.data.thumbnailLink);
    });
  })
}