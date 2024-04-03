const Invite = require('../models/invite.js');
const { acceptInvite } = require("../services/invites/acceptInviteService.js");
const { rejectInvite } = require("../services/invites/rejectInviteService.js");

exports.index = async(req, res) => {
    try {
        const invites = await Invite.findAll({ where: {user_id: req.user_id } });

        return res.status(200).json({
            status: "success",
            invites: invites
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Internal Server Error"
        });
    }
};

exports.accept = async (req, res) => {
    try {
        const { inviteId } = req.params;

        const invite = await Invite.findByPk(inviteId);
        if (!invite) {
            const error = "Invite not found with id " + inviteId + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        if (invite.status != "pending") {
            const error = "Invite already " + invite.status + ".";
            console.error(error);
            return res.status(401).json({
                status: "error",
                error: error
            });
        }

        await acceptInvite(invite.id);

        return res.status(200).json({
            status: "success",
            message: "Invite successfully accepted."
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
};

exports.reject = async (req, res) => {
    try {
        const { inviteId } = req.params;

        const invite = await Invite.findByPk(inviteId);
        if (!invite) {
            const error = "Invite not found with id " + inviteId + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        if (invite.status != "pending") {
            const error = "Invite already " + invite.status + ".";
            console.error(error);
            return res.status(401).json({
                status: "error",
                error: error
            });
        }

        await rejectInvite(invite.id);

        return res.status(200).json({
            status: "success",
            message: "Invite successfully rejected."
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
};