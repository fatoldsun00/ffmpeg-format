const assert = require('assert');
const expect = require('chai').expect
const app = require('../index')
var request = require('supertest');


describe('Unit testing overlay route', function() {
  // Called once before any of the tests in this block begin.
  before(function(done) {
    done()
  });
  it('should return OK status', async function() {
    try {
      const response = await request(app).get('/api/overlay/text')
      assert.equal(response.status, 200)
    } catch (error) {
      throw error
    }
  });

  /*it('should return message on rendering', function() {
    return request(app)
      .get('/home')
      .then(function(response){
          expect(response.text).to.contain('Welcome Home Dude !!');
      })
  });*/

});
