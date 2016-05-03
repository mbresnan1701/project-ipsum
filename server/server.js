const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const stats_controller = require('./routes/stats_route');
const getStats_controller = require('./routes/getStats_route');

const app = express();

const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

const jsonParser = bodyParser.json();

/*======== GITHUB AUTHENTICATION SETUP ===========*/
const passport = require('passport');
require('./auth/passport')(passport); // pass passport for configuration
require('./auth/configRoutes')(app, passport); // pass app for configuration
/*================================================*/

app.use('/getStats', jsonParser, getStats_controller);

app.use(express.static('./dist'));
app.use(bodyParser.json()); // for parsing application/json
app.use('/stats', jsonParser, stats_controller);

// api interface for interacting with digital_ocean, et al.
const configureRequest = require('./api/configure.js');
const makeRequest = require('./api/makeRequest.js');
const sendReply = require('./api/sendReply');
app.use('/api/:action', configureRequest, makeRequest, sendReply);

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/favicon.ico'));
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('*', (request, response) => {
  console.log('directing to index');
  response.sendFile(path.resolve(__dirname, '../public/index.html'));

const port = process.env.port || 1337;

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Server listening at 127.0.0.1, port:', port);
  }
});

module.exports = app;
