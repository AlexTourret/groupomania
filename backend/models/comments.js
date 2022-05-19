const Sequelize = require('sequelize')
const sequelize = require('./database')

const comment = sequelize.define('comment', {

    message: {type: Sequelize.STRING,allowNull: false},
    image: {type: Sequelize.STRING },
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    post_id: {type: Sequelize.INTEGER,allowNull: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = comment;