const Router = require('express')
const router = new Router()

// Заглушка для POST /brand
router.post('/', (req, res) => {
    console.log("Получен POST-запрос на /brand", req.body)
    res.json({ message: "Бренд создан (заглушка)" })
})

// Заглушка для GET /brand
router.get('/', (req, res) => {
    console.log("Получен GET-запрос на /brand")
    res.json([{ id: 1, name: "Пример бренда" }])
})

module.exports = router