const sequelize = require(`../db`)
const {DataTypes} = require('sequelize')
const {populate} = require("dotenv");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})
const My_Printer = sequelize.define('my_Printer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const My_printers_INFO = sequelize.define('my_printers_INFO', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Printer = sequelize.define('printer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})
const Print_technology = sequelize.define('print_technology', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Popularity = sequelize.define('popularity', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    users: {type: DataTypes.INTEGER, allowNull: false},
})
const Printer_INFO = sequelize.define('printer_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Print_technology_Brand = sequelize.define('print_technology_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(My_Printer)
My_Printer.belongsTo(User)

User.hasMany(Popularity)
Popularity.belongsTo(User)

My_Printer.hasMany(My_printers_INFO)
My_Printer.belongsTo(Printer)

Print_technology.hasMany(Printer)
Printer.belongsTo(Print_technology)

Printer.hasMany(Popularity)
Popularity.belongsTo(Printer)

Printer.hasMany(My_printers_INFO)
My_printers_INFO.belongsTo(Printer)

Printer.hasMany(Printer_INFO)
Printer.belongsTo(Printer)

Print_technology.belongsToMany(Brand, {through: Print_technology_Brand})
Brand.belongsToMany(Print_technology, {through: Print_technology_Brand})


module.exports = {
    User,
    My_Printer,
    My_printers_INFO,
    Printer,
    Print_technology,
    Brand,
    Popularity,
    Printer_INFO,
    Print_technology_Brand

}
