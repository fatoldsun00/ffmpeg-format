const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const {sDebugError, sendResError} = require("./src/Services/errorHandler");
const {mode, corsAllowURL} = require("./src/config");
const i18n = require("i18n");

const app = express();
const formDataReader = multer();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(formDataReader.array());
app.use(morgan("combined"));
app.use(express.static("locales"));

//CORS middleware
app.use(
    cors({
        credentials: true,
        origin: corsAllowURL,
        optionsSuccessStatus: 204,
    })
);

//locales
app.use(i18n.init);

//routes
app.use("/api", require("./src/Routes/index"));
app.use("/demo", require("./src/Routes/demo"));

app.listen(port, "127.0.0.1", err => {
    console.log(`Running on PORT: ${port}`);
    console.log(`Mode: ${mode}`);
});

//Error handler for front-end request
app.use(sendResError);
if (mode === "env") app.use(sDebugError);

/**************** Uncaught execption fallback *****************/
process.on("uncaughtException", function (err) {
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!uncaught exception:!!!!!!!!!!!!!!!!!!!!!!!!!!!\n", err.stack || err);
});

/**************** exit signal *****************/
process.on("SIGINT", async function () {
    console.log("App quit");
    process.exit();
});

module.exports = app;
