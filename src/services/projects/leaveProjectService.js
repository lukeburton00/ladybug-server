const Project = require("../../models/project.js");
const User = require("../../models/user.js");

exports.leaveProject = async(user_id, project_id) => {
    const user = await User.findByPk(user_id);
    const project = await Project.findByPk(project_id);
    user.removeProject(project);
};