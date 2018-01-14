
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/'));

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
