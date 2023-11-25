const { Sequelize, DataTypes  } = require('sequelize');
require("dotenv").config();

const { CONFIG } = process.env;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'IGORPC',
    dialect:  'mssql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

const Person = sequelize.define('Person',{
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    parking_spot: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    last_payment: {
        type: DataTypes.DATE,
        allowNull: false
    },
    next_payment:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'Najemcy',
    updatedAt: false,
    createdAt: false
})

const userSchema = sequelize.define('userSchema',{
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'user',
    updatedAt: false,
    createdAt: false
})

Person.sync();
userSchema.sync();

module.exports = {
    Person,
    userSchema
}