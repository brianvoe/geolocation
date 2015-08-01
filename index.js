var geoip = require('geoip-lite');

module.exports = function (options) {
  options = options || {};

  // If testmode set ip to something other than 127.0.0.1
  var ip = this.ip;
  if (options.testmode != undefined && options.testmode) {
    ip = '8.8.8.8';
  }

  return function* geolocation(next) {
    // If any urls need to be excluded return now
    if (options.exclude != undefined && options.exclude.indexOf(this.url) != -1) {
      return yield next;
    }

    // Do geolocation lookup using geoip and set request context
    this.request.ipGeolocation = geoip.lookup(ip);

    yield next;
  }

}
