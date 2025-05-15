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
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const printTechnology = sequelize.define('printTechnology', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Printer = sequelize.define('printer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
    // Ключевое изменение - правильные имена внешних ключей:
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'brand_id' // Указываем соответствие с именем в БД
    },
    printTechnologyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'printTechnologyId' // Соответствие с БД
    }
});
const rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    users: {type: DataTypes.INTEGER, allowNull: false},
})
const Printer_INFO = sequelize.define('printer_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const printTechnologyBrand = sequelize.define('printTechnology_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(My_Printer)
My_Printer.belongsTo(User)

User.hasMany(rating)
rating.belongsTo(User)

My_Printer.hasMany(My_printers_INFO)
My_Printer.belongsTo(Printer)

printTechnology.hasMany(Printer)
Printer.belongsTo(printTechnology)

Printer.hasMany(rating)
rating.belongsTo(Printer)

Printer.hasMany(My_printers_INFO)
My_printers_INFO.belongsTo(Printer)

Printer.hasMany(Printer_INFO, {as: 'info'})
Printer.belongsTo(Printer)

printTechnology.belongsToMany(Brand, {through: printTechnologyBrand})
Brand.belongsToMany(printTechnology, {through: printTechnologyBrand})


module.exports = {
    User,
    My_Printer,
    My_printers_INFO,
    Printer,
    printTechnology,
    Brand,
    rating,
    printTechnologyBrand,
    Printer_INFO
}
