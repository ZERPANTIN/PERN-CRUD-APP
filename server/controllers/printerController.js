const uuid = require('uuid')
const path = require('path')
const {Printer, Printer_INFO} = require('../models/models')
const ApiError = require('../error/ApiError')

class PrinterController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, printTechnologyId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const printer = await Printer.create({name, price, brandId, printTechnologyId, img: fileName});

            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    Printer_INFO.create({
                        title: i.title,
                        description: i.description,
                        printerId: printer.id
                    })
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
}

module.exports = new PrinterController()