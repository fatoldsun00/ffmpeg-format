const express = require('express')
const overlayRouter = express.Router()
const overlayController = require('../Controllers/overlayController')
const AppError = require('../Services/AppError')

overlayRouter.use((req,res,next)=>{
  //check input data and forward an error
  const { text, duration, resolution, X,Y, startTime, endTime } = req.body
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

  //X,Y inside resolution
  const [resolutionX, resolutionY] = resolution.toUpperCase().split("X")
  if ((X && X > parseFloat(resolutionX)) || (Y && Y > parseFloat(resolutionY))){
    next(new AppError(400, 'ERR_TEXT_OUTSIDE_RESOLUTION'))
    return
  }

  //display time into duration
  if ((startTime && (parseFloat(startTime) < 0 || parseFloat(startTime) > parseFloat(duration))) ||
      (endTime  && (parseFloat(endTime) < 0 || parseFloat(endTime) > parseFloat(duration)))){
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
