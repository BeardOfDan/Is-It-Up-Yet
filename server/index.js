
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// get environment variables
require('dotenv').config();

const DB = require(path.join(__dirname + '/../db/index.js'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + '/public/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());




app.listen(PORT, () => {
  // console.log('\ndb status:', DB.getStatus());
  console.log('\nListening on port: ' + PORT);
});
