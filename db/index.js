const mongoose = require('mongoose');

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

module.exports = {
  getStatus
};

