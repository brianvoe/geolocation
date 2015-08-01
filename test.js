var request = require('supertest');
var geolocation = require('./');
var koa = require('koa');

describe('geolocation()', function () {

  it('should return me geolocation information', function (done) {
    var app = koa();

    app.use(geolocation({
      testmode: true
    }));

    app.use(function* (next) {
      this.body = this.request.ipGeolocation;
    });

    request(app.listen())
      .get('/')
      .expect('{"range":[134744064,134744319],"country":"US","region":"CA","city":"Mountain View","ll":[37.386,-122.0838],"metro":807}', done);
  });
});
