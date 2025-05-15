const Router = require('express')
const router = new Router()
const printerController = require('../controllers/printerController')

router.post('/', printerController.create)
router.get('/', printerController.getAll)

module.exports = router