const applicationRoot = __dirname.replace(/\\/g,"/"),
    ipAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost', //or your ip address
    port = process.env.OPENSHIFT_NODEJS_PORT || 3030, //port to use
    mockRoot = applicationRoot + '/json', //mockjs json file dir to load
    apiRoot = '/'; //target root

/* Create Express application */
const express = require("express");
const logger = require('morgan');
const errorHandler = require('express-error-handler');
const mockjs = require('express-mockjs');

const app = express();

/* Configure a simple logger and an error handler. */
app.use(logger("default"));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

/* Use mockjs in json folder */
app.use(apiRoot, mockjs(mockRoot));

app.use(express.static(__dirname));
/* Start the API mock server. */
console.log('Application root directory: [' + applicationRoot +']');
app.listen(port,ipAddress,function(){
  console.log('Mock Api Server listening: [http://' + ipAddress + ':' + port + ']');
});
