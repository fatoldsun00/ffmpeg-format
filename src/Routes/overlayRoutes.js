const express = require('express')
const overlayRouter = express.Router()
const overlayController = require('../Controllers/overlayController')


overlayRouter.route('/text')
  .post(overlayController.translateText)
  .get(()=>{
    console.log('ok')
  })

module.exports = overlayRouter;
