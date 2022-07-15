const fbAdmin = require('firebase-admin');
let serviceAccount = require();

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceAccount)
});

const db = fbAdmin.firestore();

module.exports = db;