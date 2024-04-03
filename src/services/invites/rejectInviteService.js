const Invite = require('../../models/invite.js');

exports.rejectInvite = async (inviteId) => {
    const invite = await Invite.findByPk(inviteId);
    invite.update({status: 'rejected'});
};