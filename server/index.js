
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bluebird = require('bluebird');

// get environment variables
require('dotenv').config();

const DB = require(path.join(__dirname + '/../db/index.js'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../public/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/status', (req, res, next) => {
  res.status(200).end('db status: ' + DB.getStatus());
});

app.get('/asdf', (req, res, next) => {
  const urls = ['http://www.example.com', 'http://www.google.com', 'http://www.startpage.com', 'http://www.bing.com'];

  DB.hasPages(urls)
    .then((result) => {
      res.status(200).end(JSON.stringify(result, undefined, 2));
    })
    .catch((e) => {
      console.log('error, could not send result');
      res.status(400).end('error: ' + e);
    });
});

app.get('/jkl', (req, res, next) => {
  const urls = ['http://www.example.com', 'http://www.google.com', 'http://www.startpage.com', 'http://www.bing.com'];

  DB.savePages(urls)
    .then((result) => {
      res.status(200).end('result: ' + JSON.stringify(result, undefined, 2));
    })
    .catch((e) => {
      console.log('error, could not save page');
      res.status(400).end('error: ' + e);
    });

});

app.get('/test', (req, res, next) => {
  const urls = [
    "example.com",
    "google.com",
    "startpage.com"
  ]

  DB.hasURLs(urls)
    .then((result) => {
      res.status(200).end('res: ' + JSON.stringify(result, undefined, 2));
    })
    .catch((e) => {
      res.status(400).end('error: ' + e);
    });
});

app.post('/test', (req, res, next) => {
  const urls = req.body.urls;

  DB.savePages(urls)
    .then((results) => {
      console.log('results:', results);

      res.end('results: ' + JSON.stringify(results, undefined, 2));
    });

  // const promises = [];
  // const results = [];

  // for (let i = 0; i < urls.length; i++) {
  //   promises.push(DB.savePage(urls[i])
  //     .then((result) => {
  //       results.push({ 'url': urls[i], 'result': result });
  //     }));
  // }

  // const promises = urls.map((url) => {
  //   return new Promise((resolve, reject) => {
  //     resolve(DB.savePage(url));
  //   })
  //     .then((response) => {
  //       results.push({ 'url': urls[i], 'result': result });
  //     })
  //     .catch((e) => {
  //       console.log('Error! app.post(test)');
  //     });
  // });


  // bluebird
  //   .all(promises)
  //   .then(() => {
  //     // TODO parse results to determine if all, none, or some (but not all) were saved
  //     // Based on this, set the status accordingly

  //     res.end('results: ' + JSON.stringify(results, undefined, 2));
  //   });
});


app.listen(PORT, () => {
  // console.log('\ndb status:', DB.getStatus());
  console.log('\nListening on port: ' + PORT);
});
