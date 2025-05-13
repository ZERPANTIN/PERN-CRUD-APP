const Router = require('express')
const router = new Router()

// POST /printer
router.post('/', (req, res) => {
    console.log('POST /printer', req.body)
    res.json({
        id: 1,
        name: req.body.name || 'Test Printer',
        price: req.body.price || 999,
        brandId: req.body.brandId || 1
    })
})

// GET /printer
router.get('/', (req, res) => {
    console.log('GET /printer')
    res.json([
        { id: 1, name: 'Printer 1', price: 1000, brandId: 1 },
        { id: 2, name: 'Printer 2', price: 1500, brandId: 2 }
    ])
})

// GET /printer/:id
router.get('/:id', (req, res) => {
    console.log(`GET /printer/${req.params.id}`)
    res.json({
        id: req.params.id,
        name: `Printer ${req.params.id}`,
        price: 1000,
        brandId: 1
    })
})

module.exports = router