const Invite = require('../../models/invite.js');
const User = require('../../models/user.js');
const Project = require('../../models/project.js');

exports.sendInvite = async (userId, projectId) => {
    const user = await User.findByPk(userId);
    const project = await Project.findByPk(projectId);
    const invite = await Invite.create({user_id: userId, project_id: projectId, status: 'pending'});
    
    user.addInvite(invite);
    project.addInvite(invite);
};