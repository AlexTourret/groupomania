const Sequelize = require('sequelize')
const sequelize = require('../models/database')
const comment = require('./comments');

const post = sequelize.define('post', {

    title: {type: Sequelize.STRING,allowNull: false},
    image: {type: Sequelize.STRING },
    message: {type: Sequelize.TEXT,allowNull: false},
    user_id: {type: Sequelize.INTEGER,allowNull: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})
post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(post, { foreignKey: 'post_id' });

module.exports = post;
