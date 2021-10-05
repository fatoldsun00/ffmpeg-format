const express = require('express')
const overlayRouter = express.Router()
const overlayController = require('../Controllers/overlayController')
const AppError = require('../Services/AppError')

overlayRouter.use((req,res,next)=>{
  //check input data and forward an error
  const { text, inputPath, duration, resolution, outputPath,x,y, fontSize, fontColor, startTime, endTime } = req.body
  //x,y inside resolution
  if (!text){
    next(new AppError(400, 'ERR_TEXT_REQUIRED'))
    return
  }
  if (!resolution){
    next(new AppError(400, 'ERR_RESOLUTION_REQUIRED'))
    return
  }
  const [resolutionX, resolutionY] = resolution.split("x")
  if (x > parseInt(resolutionX) || y > parseInt(resolutionY)){
    next(new AppError(400, 'ERR_TEXT_OUTSIDE_RESOLUTION'))
    return
  }
  //display time into duration
  if (!startTime || !endTime){
    next(new AppError(400, 'ERR_TIME_OUTSIDE_DURATION'))
    return
  }
  next()
})
overlayRouter.route('/text')
  .post(overlayController.translateText)
  .get((res,rep, next)=>{
    console.log('ok')
    next()
  })

module.exports = overlayRouter;
