const Router = require('express')
const router = new Router()

// POST /print_technology
router.post('/', (req, res) => {
    console.log('POST /print_technology', req.body)
    res.json({
        id: 1,
        name: req.body.name || 'Test Technology',
        description: req.body.description || 'Test description'
    })
})

// GET /print_technology
router.get('/', (req, res) => {
    console.log('GET /print_technology')
    res.json([
        { id: 1, name: 'FDM', description: 'Fused Deposition Modeling' },
        { id: 2, name: 'SLA', description: 'Stereolithography' }
    ])
})

module.exports = router