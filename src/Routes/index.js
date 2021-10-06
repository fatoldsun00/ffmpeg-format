const app = require("express");
const frontRouter = app.Router();

// Gestionnaire d'erreur
const {sFrontError} = require("../Services/errorHandler");

// Routes
const overlayRoutes = require("./overlayRoutes");

//Montage des routes
frontRouter.use("/overlay", overlayRoutes);

//Handle error
frontRouter.use(sFrontError);

//Send response
frontRouter.use(async (req, res, next) => {
    await res.status(res.locals.status).json(res.locals.message);
});

module.exports = frontRouter;
