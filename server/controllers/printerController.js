const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Printer, Printer_INFO} = require('../models/models')
const ApiError = require('../error/ApiError')

class PrinterController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, print_technologyId, info} = req.body // Исправлено на print_technologyId
            const {img} = req.files

            // Проверка и создание папки static
            const staticPath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(staticPath)) {
                fs.mkdirSync(staticPath, { recursive: true })
            }

            // Генерация имени файла
            let fileName = uuid.v4() + path.extname(img.name)
            await img.mv(path.resolve(staticPath, fileName))

            // Создание принтера
            const printer = await Printer.create({
                name,
                price,
                brandId,
                printTechnologyId: print_technologyId, // Маппинг полей
                img: fileName
            })

            // Обработка характеристик
            if (info) {
                info = JSON.parse(info)
                await Promise.all(
                    info.map(i =>
                        Printer_INFO.create({
                            title: i.title,
                            description: i.description,
                            printerId: printer.id
                        })
                    )
                )
            }

            return res.json(printer)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, printTechnologyId, limit, page} = req.query
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let printers
        if (!brandId && !printTechnologyId) {
            printers = await Printer.findAndCountAll({limit, offset})
        }
        if (brandId && !printTechnologyId) {
            printers = await Printer.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && printTechnologyId) {
            printers = await Printer.findAndCountAll({where: {printTechnologyId}, limit, offset})
        }
        if (brandId && printTechnologyId) {
            printers = await Printer.findAndCountAll({where: {printTechnologyId, brandId}, limit, offset})
        }
        return res.json(printers)
    }
    async getOne(req, res) {
        const {id} = req.params
        const printer = await Printer.findOne(
            {
                where: {id},
                include: [{ model: Printer_INFO, as: 'info' }],
            }
        )
        return res.json(printer)
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) throw ApiError.badRequest('Не указан ID принтера')

            // 1. Удаляем связанные характеристики
            await Printer_INFO.destroy({where: {printerId: id}})

            // 2. Удаляем сам принтер
            const deleted = await Printer.destroy({where: {id}})

            if (!deleted) throw ApiError.notFound('Принтер не найден')

            return res.json({success: true})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PrinterController()