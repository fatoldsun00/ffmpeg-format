const app = require('express')
const frontRouter = app.Router()

// Gestionnaire d'erreur
const { sFrontError } = require('../Services/errorHandler')
const AppError = require('../Services/AppError')

// Routes
const overlayRoutes = require('./overlayRoutes')

//Montage des routes
frontRouter.use('/overlay', overlayRoutes)

//Handle error
frontRouter.use(sFrontError)

module.exports = frontRouter
