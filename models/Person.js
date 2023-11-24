const { Sequelize, DataTypes  } = require('sequelize');

const sequelize = new Sequelize('Parking', 'sa', 'password', {
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
    imie:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nazwisko:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numer_telefonu:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    miejsce_parkingowe: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    data_ostatniej_platnosci: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_nastepnej_platnosci:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'Osoby',
    updatedAt: false,
    createdAt: false
})

Person.sync();

module.exports = Person;