const Sequelize = require('sequelize')
const sequelize = require('./database')

const comment = sequelize.define('comment', {

    message: {type: Sequelize.STRING,allowNull: false},
    date: {type: Sequelize.DATE,defaultValue: Sequelize.NOW,allowNull: false},
    image: {type: Sequelize.STRING },
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    post_id: {type: Sequelize.INTEGER,allowNull: false}
},
{
    timestamps: false
})

module.exports = comment;