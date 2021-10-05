const catchAsync = require('../Services/catchAsync')
const AppError = require('../Services/AppError')


const translateText = catchAsync(async (req, res, next) => {
  const { text } = req.body
  res.locals.status = 200
  res.locals.message = text
  next()
})

module.exports = {
  translateText, 
};
