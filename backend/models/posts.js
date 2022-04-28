const Sequelize = require('sequelize')
const sequelize = require('../models/database')
const comment = require('./comments');

const post = sequelize.define('post', {

    title: {type: Sequelize.STRING,allowNull: false},
    image: {type: Sequelize.STRING },
    created_date: {type: Sequelize.DATE,defaultValue: Sequelize.NOW,allowNull: false},
    updated_date: {type: Sequelize.DATE,defaultValue: Sequelize.NOW,allowNull: false},
    message: {type: Sequelize.TEXT,allowNull: false},
    user_id: {type: Sequelize.INTEGER,allowNull: false}

},
{
    timestamps: false
})
post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(post, { foreignKey: 'post_id' });

module.exports = post;
