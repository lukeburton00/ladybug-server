const User = require('../../models/user.js');
const Project = require('../../models/project.js');

exports.isUserMemberOfProject = async(user_id, project_id) => {
    const user = await User.findByPk(user_id);
    const project = await Project.findByPk(project_id);
    return user.hasProject(project);
};