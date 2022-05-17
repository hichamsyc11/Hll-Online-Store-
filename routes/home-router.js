const router = require('express').Router()
const homeController = require('../controllers/home-controller')
const authGuard = require('./guards/auth.guard')

router.get('/' , homeController.getHome)

module.exports =  router