
require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const { databaseService } = require('./services/databaseService');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// rutas html, pasar index como algo
require('./routes')(app, databaseService());


app.listen(process.env.PORT, function(){
    console.log('app listening on port', process.env.PORT , 'in DB:', process.env.DB);

});