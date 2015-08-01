var app = require('koa')();
var geolocation = require('./');

// Geolocation middleware
app.use(geolocation({
  testmode: true,
  exclude: ['/favicon.ico']
}));

// Main Response
app.use(function* () {
  // Set the body to the ip geolocation information
  this.body = this.request.ipGeolocation;
});

app.listen(8080);
