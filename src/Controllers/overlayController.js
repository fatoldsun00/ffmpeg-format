const catchAsync = require('../Services/catchAsync')


const translateText = catchAsync(async (req, res, next) => {
  const { text, inputPath, outputPath, fontSize, fontColor, duration } = req.body
  let {X,Y, startTime, endTime} = req.body
  X = X ? X : 0
  Y = Y ? Y : 0
  startTime = startTime ? startTime : 0
  endTime = endTime ? endTime : duration
  res.locals.status = 200
  res.locals.message = `ffmpeg -i ${inputPath} -vf drawtext="enable='between(t,${startTime},${endTime})':text='${text}':fontcolor=${fontColor}:fontsize=${fontSize}:X=${X}:Y=${Y}" ${outputPath}
  `
  next()
})

module.exports = {
  translateText, 
};
