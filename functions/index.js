
const functions = require('firebase-functions');
const express = require('express');

const firebaseRoutes = require('./routes/firebase/firebaseRoutes'); 
const sqlRoutes = require('./routes/mysql/sqlRoutes');

const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true })); 

app.use('/nosql', firebaseRoutes);
app.use('/sql', sqlRoutes);

exports.api = functions.https.onRequest(app);

