const Router = require('express')
const router = new Router()
const printTechnologyController = require('../controllers/print_technologyController')
const checkRole = require('../middleware/checkrolemiddleware')

router.post('/', checkRole('ADMIN') , printTechnologyController.create)
router.get('/', printTechnologyController.getAll)

module.exports = router