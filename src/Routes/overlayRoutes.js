const express = require('express')
const overlayRouter = express.Router()
const overlayController = require('../Controllers/overlayController')
const AppError = require('../Services/AppError')

overlayRouter.use((req,res,next)=>{
  const { duration, resolution } = req.body
  //required value for all overlay routes
  if (!resolution){
    next(new AppError(400, 'ERR_RESOLUTION_REQUIRED'))
    return
  }
  if (!duration){
    next(new AppError(400, 'ERR_DURATION_REQUIRED'))
    return
  }
  
  //init default Value
  const defaultValue = {
    X: 0,
    Y: 0,
    startTime: 0,
    endTime: parseFloat(duration),
  }
  req.body = {...defaultValue, ...req.body}

  const {X,Y, startTime, endTime } = req.body

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

module.exports = overlayRouter;
