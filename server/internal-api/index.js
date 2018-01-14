
const axios = require('axios');
const DB = require(path.join(__dirname + '/../../db/index.js'));

// Checks if the database already has an entry for a given url
// Note: If url is an Array, then this function will handle that case,
//        thereby handling multiple urls at once
const alreadyHave = (url) => {
  let response;
  if (Array.isArray(url)) {
    response = DB.hasURLs(url);
  } else {
    response = DB.hasURLS([url]);
  }


};

// Retrieves the database entry for a given url
// TODO: Make a version that gets multiple entries (for multiple urls)
const retrieveFromDB = (url) => {

};

// Gets the response body for a given url
// This is done on an interval, until a non-empty response body is returned
// The default interval is 10 seconds (or 10,000 milliseconds)
// The response is saved in a new DB entry
const acquire = (url, interval = 10000) => {

};

// Returns an array of the links in the page
const getLinks = (url) => {

};

// Returns a particular link in the page
// Example OpenLoad.co or Vidzi.tv
const getParticularLink = (url, particular) => {

};

module.exports = {
  alreadyHave,
  retrieveFromDB,
  acquire,
  getLinks,
  getParticularLink
};
