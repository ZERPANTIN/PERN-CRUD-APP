const ApiError = require('../error/ApiError')
const { printTechnology } = require('../models/models')

class PrintTechnologyController {
    async create(req, res, next) {
        try {
            const { name } = req.body

            if (!name) {
                return next(ApiError.badRequest('Не указано название технологии печати'))
            }

            // Проверяем, существует ли уже такая технология
            const existingTech = await printTechnology.findOne({ where: { name } })
            if (existingTech) {
                return next(ApiError.badRequest('Технология печати с таким названием уже существует'))
            }

            const technology = await printTechnology.create({ name })
            return res.json(technology)

        } catch (e) {
            console.error('Ошибка при создании технологии печати:', e)
            return next(ApiError.internal('Произошла ошибка при создании технологии печати'))
        }
    }

    async getAll(req, res, next) {
        try {
            const technologies = await printTechnology.findAll({
                order: [['name', 'ASC']] // Сортировка по названию
            })
            return res.json(technologies)

        } catch (e) {
            console.error('Ошибка при получении списка технологий:', e)
            return next(ApiError.internal('Произошла ошибка при получении списка технологий печати'))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const technology = await printTechnology.findOne({
                where: { id }
            })

            if (!technology) {
                return next(ApiError.notFound('Технология печати не найдена'))
            }

            return res.json(technology)

        } catch (e) {
            console.error('Ошибка при получении технологии:', e)
            return next(ApiError.internal('Произошла ошибка при получении технологии печати'))
        }
    }
}

module.exports = new PrintTechnologyController()