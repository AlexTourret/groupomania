// Include Sequelize module.
const Sequelize = require('sequelize')
  
// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('../models/database')

const post = require('../models/posts');
const comment = require('./comments');
  
// Define method takes two arrguments
// 1st - name of table
// 2nd - columns inside the table
const user = sequelize.define('user', {
  
    // Column-1, email
    usr_email: { type: Sequelize.STRING, allowNull:false },


    // Column-2, name
    usr_nom: { type: Sequelize.STRING, allowNull:false },
  
    
    // Column-3, pwd
    usr_pwd: { type: Sequelize.STRING, allowNull:false },
    
    // Column-4, role
    usr_role: { type: Sequelize.INTEGER, defaultValue:0 },
    // Column-5, default values for
    // dates => current time
    usr_Datemaj: { type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW },
  
     // Timestamps
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
})

user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
post.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(user, { foreignKey: 'user_id' });
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = user