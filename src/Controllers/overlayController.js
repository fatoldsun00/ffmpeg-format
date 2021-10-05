const catchAsync = require('../Services/catchAsync')


const translateText = catchAsync(async (req, res, next) => {
  const { text, inputPath, duration, resolution, outputPath,x,y, fontSize, fontColor, startTime, endTime } = req.body
  res.locals.status = 200
  res.locals.message = `ffmpeg -i ${inputPath} -vf drawtext="enable='between(t,${startTime},${endTime})':text='${text}':fontcolor=${fontColor}:fontsize=${fontSize}:x=${x}:y=${y}" ${outputPath}
  `
  next()
})

module.exports = {
  translateText, 
};
