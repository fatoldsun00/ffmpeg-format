const app = require("express");
const frontRouter = app.Router();

const {sFrontError} = require("../Services/errorHandler");

// Routes
const overlayRoutes = require("./overlayRoutes");

//Mount routes
frontRouter.use("/overlay", overlayRoutes);

//Error handler
frontRouter.use(sFrontError);

//Send response
frontRouter.use(async (req, res, next) => {
    await res.status(res.locals.status).json(res.locals.message);
});

module.exports = frontRouter;
