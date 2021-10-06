const express = require('express')
const overlayRouter = express.Router()
const overlayController = require('../Controllers/overlayController')
const AppError = require('../Services/AppError')

overlayRouter.use((req,res,next)=>{
  //check input data and forward an error
  const { text, inputPath, duration, resolution, outputPath,x,y, fontSize, fontColor, startTime, endTime } = req.body
  //required value
  if (!text){
    next(new AppError(400, 'ERR_TEXT_REQUIRED'))
    return
  }
  if (!resolution){
    next(new AppError(400, 'ERR_RESOLUTION_REQUIRED'))
    return
  }
  if (!duration){
    next(new AppError(400, 'ERR_DURATION_REQUIRED'))
    return
  }
  if (!startTime || !endTime){
    next(new AppError(400, 'ERR_TIME_OUTSIDE_DURATION'))
    return
  }

  //x,y inside resolution
  const [resolutionX, resolutionY] = resolution.split("x")
  if (x > parseFloat(resolutionX) || y > parseFloat(resolutionY)){
    next(new AppError(400, 'ERR_TEXT_OUTSIDE_RESOLUTION'))
    return
  }
  //display time into duration
  if (parseFloat(startTime) > parseFloat(duration) || parseFloat(endTime) > parseFloat(duration)
      || parseFloat(startTime) < 0 || parseFloat(duration) < 0){
    next(new AppError(400, 'ERR_TIME_OUTSIDE_DURATION'))
    return
  }
  next()
})
overlayRouter.route('/text')
  .post(overlayController.translateText)
  .get((res,rep, next)=>{
    res.locals.status = 200
    res.locals.message = 'ok'
    next()
  })

module.exports = overlayRouter;
