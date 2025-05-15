const uuid = require('uuid')
const path = require('path')
const {Printer} = require('../models/models')
const ApiError = require('../error/ApiError')

class PrinterController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, print_technologyId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const printer = await Printer.create({name, price, brandId, print_technologyId, img:fileName})

            return res.json(printer)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        const {brandId, print_technologyId} = req.query
        let printers
        if (!brandId && !print_technologyId) {
            printers = await Printer.findAll()
        }
        if (brandId && !print_technologyId) {
            printers = await Printer.findAll({where: {brandId}})
        }
        if (!brandId && print_technologyId) {
            printers = await Printer.findAll({where: {print_technologyId}})
        }
        if (brandId && print_technologyId) {
            printers = await Printer.findAll({where: {print_technologyId, brandId}})
        }
        return res.json(printers)
    }
    async getOne(req, res) {

    }
}

module.exports = new PrinterController()