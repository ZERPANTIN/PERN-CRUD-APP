const Router = require('express')
const router = new Router()

// POST /user/registration
router.post('/registration', (req, res) => {
    console.log('POST /user/registration', req.body)
    res.json({
        id: 1,
        email: req.body.email || 'test@mail.ru',
        password: 'hidden',
        role: 'USER'
    })
})

// POST /user/login
router.post('/login', (req, res) => {
    console.log('POST /user/login', req.body)
    res.json({ token: 'test-token-123' })
})

// GET /user/auth
router.get('/auth', (req, res) => {
    console.log('GET /user/auth')
    res.json({
        id: 1,
        email: 'test@mail.ru',
        role: 'USER'
    })
})

module.exports = router