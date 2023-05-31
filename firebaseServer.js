const admin = require('firebase-admin');
const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saiot-fb259-default-rtdb.firebaseio.com/'
});

module.exports = admin;