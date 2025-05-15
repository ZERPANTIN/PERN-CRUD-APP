const Router = require('express')
const router = new Router()
const printerController = require('../controllers/printerController')
const checkRole = require('../middleware/checkrolemiddleware')


router.post('/', checkRole('ADMIN') , printerController.create)
router.get('/', printerController.getAll)
router.get('/:id', printerController.getOne)

module.exports = router