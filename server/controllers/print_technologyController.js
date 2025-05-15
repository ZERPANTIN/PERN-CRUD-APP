const  {Print_technology} = require('../models/models')
const ApiError = require('../error/ApiError')
class Print_technologyController {
    async create(req, res) {
        const {name} = req.body
        const print_technology = await Print_technology.create({name})
        return res.json(print_technology)
    }

    async getAll(req, res) {
        const print_technology = await Print_technology.findAll()
        return res.json(print_technology)
    }
}

module.exports = new Print_technologyController()