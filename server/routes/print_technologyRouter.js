const Router = require('express')
const router = new Router()
const print_technologyController = require('../controllers/print_technologyController')
const checkRole = require('../middleware/checkrolemiddleware')

router.post('/', checkRole('ADMIN') , print_technologyController.create)
router.get('/', print_technologyController.getAll)

module.exports = router