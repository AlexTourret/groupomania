const Sequelize = require('sequelize')
const sequelize = require('./database')

const comment = sequelize.define('comment', {

    message: {type: Sequelize.STRING,allowNull: false},
    image: {type: Sequelize.STRING },
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    post_id: {type: Sequelize.INTEGER,allowNull: false},
    moderate: {type: Sequelize.BOOLEAN,defaultValue: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = comment;