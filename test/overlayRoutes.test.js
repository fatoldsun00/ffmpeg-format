const assert = require('assert');
const expect = require('chai').expect
const app = require('../index')
var request = require('supertest');


describe('Unit testing overlay route', function() {
  // Called once before any of the tests in this block begin.
  before(function(done) {
    done()
  });
  describe('route /api/overlay/text', function() {
    it('should return status === 200', async function() {
      const response = await request(app)
        .post('/api/overlay/text')
        .send({
          inputPath: "test_input1.mp4",
          duration: "60.0 s",
          resolution: "1920 x 1080",
          outputPath: "test_output1.mp4",
          text: "I’m sOoOo good at this game! xD",
          X: 200,
          Y: 100,
          fontSize: 64,
          fontColor: "0xFFFFFF",
          startTime: "23.0 s",
          endTime: "40.0 s",
        })
        assert.equal(response.status, 200, JSON.stringify(response.body.errmsg))
      
    });

    it('should return status === 200 without X,Y position', async function() {
      const response = await request(app)
        .post('/api/overlay/text')
        .send({
          inputPath: "test_input2.mp4",
          duration: "60.0 s",
          resolution: "1920 x 1080",
          outputPath: "test_output2.mp4",
          text: "Brutal, Savage, Rekt",
          fontSize: 48,
          fontColor: "0x000000",
          startTime: "0.0 s",
          endTime: "60.0 s",
        })
        assert.equal(response.status, 200, JSON.stringify(response.body.errmsg))
      
    });
    it('should return error : ERR_TIME_OUTSIDE_DURATION', async function() {
      const response = await request(app)
        .post('/api/overlay/text')
        .send({
          inputPath: "test_input3.mp4",
          duration: "60.0 s",
          resolution: "1920 x 1080",
          outputPath: "test_output3.mp4",
          text: "RIP",
          X: 100,
          Y: 200,
          fontSize: 32,
          fontColor: "0xFFFFFF",
          startTime: "24.0 s",
          endTime: "75.0 s",
        })
        assert.equal(response.body.code,"ERR_TIME_OUTSIDE_DURATION")
        assert.equal(response.status, 400)
      
    });
    it('should return error : ERR_TEXT_OUTSIDE_RESOLUTION', async function() {
      const response = await request(app)
        .post('/api/overlay/text')
        .send({
          inputPath: "test_input4.mp4",
          duration: "60.0 s",
          resolution: "1920 x 1080",
          outputPath: "test_output4.mp4",
          text: "RIP",
          X: 100,
          Y: 9999,
          fontSize: 48,
          fontColor: "0x777777",
          startTime: "24.0 s",
          endTime: "48.0 s",
        })
        console.log(response.body);
        assert.equal(response.body.code,"ERR_TEXT_OUTSIDE_RESOLUTION")
        assert.equal(response.status, 400)
      
    });
  })
  
  /*it('should return message on rendering', function() {
    return request(app)
      .get('/home')
      .then(function(response){
          expect(response.text).to.contain('Welcome Home Dude !!');
      })
  });*/

});
