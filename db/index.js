const axios = require('axios');

const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

// The default url only works on local machines
let connectionURL = 'mongodb://localhost/fetcher';

// If there is an environment variable, use that to set the db uri
if ((process.env.DBPLACE !== undefined) && (process.env.DBPLACE !== null)) {
  // mongodb url format
  // mongodb://your_user_namer:your_password@ds119748.mlab.com:19748/local_library

  const logInCredentials = process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@';
  connectionURL = 'mongodb://' + logInCredentials + process.env.DBPLACE;
}

mongoose.connect(connectionURL, { useMongoClient: true });

// ===============
// === Schemas ===
// ===============

// -----------------------
// --- website schemas ---
// -----------------------

// pageSchema is for generally checking if a webpage is up yet (or if it went down)
const pageSchema = mongoose.Schema({
  'url': { type: String, unique: true, dropDups: true },
  'isUp': Boolean, // true => the page is up and false => the page is down
  'lastStatus': Number, // The HTTP status code returned with the last page request
  'lastChecked': Number, // Unix time stamp
  'lastChangeAt': Number, // Unix time stamp of when the page last went up/down
  //                         This is to calculate the up/down time
  'changeLog': [{
    'status': Boolean, // true => came back online; false => went offline
    'at': Number // Unix time stamp of when the change was logged
  }],
  // NOTE: A user can only appear in EITHER watchersTemp OR watchersAlways
  //       If a users opts into one, while in the other, they will be removed from the other
  'watchersTemp': [String], // User IDs for people to notify if it goes up/down (but only for a short time)
  //                         These users likely only want to know when the site finally comes back up
  //                         After the website has been up for a length of time (probably an hour), this list will be wiped
  // TODO: Add functionality for a user to determine if they care that it just went online (and don't care if it crashes right after),
  //       or if they want to know when it is deemed 'stable' (has been on for at least an hour), or both
  'watchersAlways': [String]  // User IDs for people to notify if it goes up/down
  //                           This list is only updated by users opting in or out of it
});

const primewireSchema = mongoose.Schema({
  'url': String,
  'links': [String],
  'type': String, // Movie, TV Show, Season, Episode
  'name': String // Generic Name. Ex: Star Wars, X-Files, etc.
});

// --------------------
// --- user schemas ---
// --------------------

const userSchema = mongoose.Schema({
  'userName': String,
  'watchedLinks': [String], // an array of ids for the pages watched
  'watchedPrimeWireLinks': [String] // an array of ids for the primewire pages watched
});

// ==============
// === Models ===
// ==============

const User = mongoose.model('User', userSchema);
const Page = mongoose.model('Page', pageSchema);
const PrimeWire = mongoose.model('PrimeWire', primewireSchema);

// =================
// === Functions ===
// =================

const getStatus = () => {
  /* http://mongoosejs.com/docs/api.html#connection_Connection-readyState
    Connection ready state

    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
  */

  const status = mongoose.connection.readyState;

  switch (status) {
    case 0:
      return 'disconnected';
      break;
    case 1:
      return 'connected';
      break;
    case 2:
      return 'connecting';
      break;
    case 3:
      return 'disconnecting';
      break;
    default:
      return 'Error! Invalid mongoose status!';
  }
};

// Checks if there is a saved page for the given url
// TODO: Make a version for primewire
const hasPage = (url) => {
  return Page
    .findOne({ url })
    .exec()
    .then((result) => {
      if (result === null) {
        return false;
      }
      return true;
    })
    .catch((e) => {
      return e;
    });
};

// arr is an array of urls
const hasPages = async (arr) => {
  const results = [];

  for (let i = 0; i < arr.length; i++) {
    const result = await hasPage(arr[i]);
    results.push({ 'url': arr[i], 'hasPage': result });
  }

  return results;
};

const savePage = (url) => {
  // TODO: Check to ensure that the url does not already have a page entry

  const page = new Page({
    url,
    'changeLog': [],
    'watchersTemp': [],
    'watchersAlways': []
  });

  return page
    .save()
    .then(function (savedPage) {
      // Initially checks if the page is up or down, also initializes certain fields
      initializePage(savedPage);

      return savedPage;
    })
    .catch((e) => {
      console.log('ERROR!\n  could not save the page with the url ', url, '\n', e);
    });
};

const initializePage = (page) => {

  console.log('\n\nInitializePage\n');

  // axios call
  // then     date.now()
  //          push object to changelog

  console.log('page.url', page.url);

  axios.get('http://www.' + page.url)
    .then((response) => {
      console.log('\n\n======================\nresponse.status:', JSON.stringify(response.status, undefined, 2));
      console.log('\n======================\nresponse.length:', JSON.stringify(response.data.length));
    })
    .catch((e) => {
      console.log('\n\n --------- \n\n ERROR: ' + e);
    });

  // 'isUp': Boolean, // true => the page is up and false => the page is down
  // 'lastChecked': Number, // Unix time stamp
  // 'lastChangeAt': Number, // Unix time stamp of when the page last went up/down

  // push a new value to this, based on the values above
  // 'changeLog': [{
  //   'status': Boolean, // true => came back online; false=> went offline
  //   'at': Number // Unix time stamp of when the change was logged
  // }],
};

// pages is an array of page urls
const savePages = async (pages) => {
  const results = [];

  for (let i = 0; i < pages.length; i++) {
    const pageResult = await savePage(pages[i]);
    if (pageResult !== undefined) {
      results.push(pageResult);
    }
  }

  return results;
};

module.exports = {
  getStatus,
  hasPage,
  hasPages,
  savePage,
  savePages
};

