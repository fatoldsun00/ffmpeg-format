const catchAsync = require("../Services/catchAsync");
const AppError = require("../Services/AppError");

const translateText = catchAsync(async (req, res, next) => {
    const {text, inputPath, outputPath, fontSize, fontColor, startTime, endTime, X, Y} = req.body;

    if (!text) {
        next(new AppError(400, "ERR_TEXT_REQUIRED"));
        return;
    }

    res.locals.status = 200;
    res.locals.message = `ffmpeg -i ${inputPath} -vf drawtext="enable='between(t,${startTime},${endTime})':text='${text}':fontcolor=${fontColor}:fontsize=${fontSize}:X=${X}:Y=${Y}" ${outputPath}`;
    next();
});

module.exports = {
    translateText,
};
