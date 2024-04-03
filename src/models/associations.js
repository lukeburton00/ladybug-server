const User = require('./user.js');
const Project = require('./project.js');
const Task = require('./task.js');
const Invite = require('./invite.js');

exports.configure_associations = function() {
    User.belongsToMany(Project, {through: 'user_projects'});
    Project.belongsToMany(User, {through: 'user_projects'});

    Project.hasMany(Task, {
        onDelete: 'CASCADE',
        foreignKey: 'project_id'
    });

    User.hasMany(Task, {
        onDelete: 'SET NULL',
        foreignKey: 'user_id'
    });
    
    Task.belongsTo(Project, {foreignKey: 'project_id'});
    Task.belongsTo(User, {foreignKey: 'user_id'});

    User.hasMany(Invite, { foreignKey: 'user_id' });
    Invite.belongsTo(User, { foreignKey: 'user_id' });

    Project.hasMany(Invite, { foreignKey: 'project_id' });
    Invite.belongsTo(Project, { foreignKey: 'project_id' });
}