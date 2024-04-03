const Invite = require('../../models/invite.js');
const User = require('../../models/user.js');
const Project = require('../../models/project.js');

exports.acceptInvite = async (inviteId) => {
    const invite = await Invite.findByPk(inviteId);
    const user = await User.findByPk(invite.user_id);
    const project = await Project.findByPk(invite.project_id);

    user.addProject(project);
    invite.update({status: 'accepted'});
};