const express = require('express')
const router = express.Router()

const brandRouter = require('./brandRouter')
const print_technologyRouter = require('./print_technologyRouter')
const printerRouter = require('./printerRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/print_technology', print_technologyRouter)
router.use('/brand', brandRouter)
router.use('/devise', printerRouter)

module.exports = router