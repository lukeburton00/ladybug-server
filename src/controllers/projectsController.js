const Project = require("../models/project.js");
const User = require("../models/user.js");
const { leaveProject } = require("../services/projects/leaveProjectService.js");
const { getUserProjects } = require("../services/projects/getUserProjectsService.js");
const { isUserMemberOfProject } = require("../services/projects/projectMembershipService.js");
const { sendInvite } = require("../services/invites/sendInviteService.js");

exports.index = async(req, res) => {
    try {
        const projects = await getUserProjects(req.user_id);

        return res.status(200).json({
            status: 'success',
            projects: projects
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

exports.create = async(req, res) => {
    try {
        const { name } = req.body.project;

        const existing_project = await Project.findOne({ where: { name: name, owner_id: req.user_id } });
        if (existing_project) {
            const error = "Project " + name + " already exists for user " + req.user_id + ".";
            console.error(error);
            return res.status(400).json({ 
                error: error });
        }

        const project = await Project.create({name: name, owner_id: req.user_id});
        const user = await User.findByPk(req.user_id);
        user.addProject(project);

        return res.status(201).json({
            status: 'success',
            message: 'Project successfully created'
        });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
}

exports.show = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = "Project not found with id " + projectId + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const isMember = await isUserMemberOfProject(req.user_id, project.id);
        if (!isMember) {
            console.error("User not member of project " + project.id + ".");
            return res.status(401).json({
                status: "error",
                error: "You do not have permission to perform this action."
            });
        }

        return res.status(200).json({
            status: 'success',
            project: project
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

exports.update = async(req, res) => {
    try {
        const { projectId } = req.params;
        const { name } = req.body.project;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = "Project not found with id " + projectId + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        if (project.owner_id != req.user_id) {
            console.error("User " + req.user_id + " is not allowed to access project " + project.id + ".");
            return res.status(401).json({
                status: "error",
                error: "You do not have permission to perform this action."
            });
        }

        const existing_project = await Project.findOne({ where: { name: name, owner_id: req.user_id } });
        if (existing_project) {
            const error = "Project " + name + " already exists for user " + req.user_id;
            console.error(error);
            return res.status(400).json({ 
                error: error });
        }

        await project.update({name: name});

        return res.status(201).json({
            status: 'success',
            message: 'Project successfully updated'
        });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
}

exports.delete = async(req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({
                status: "error",
                error: 'Project not found'
            });
        }

        if (project.owner_id != req.user_id) {
            console.error('User ' + req.user_id + ' attempted to delete project without permission.');
            return res.status(401).json({
                status: "error",
                error: 'You do not have permission to perform this action'
            });
        }

        await project.destroy();

        return res.status(200).json({
            status: 'success',
            message: 'Project successfully deleted.'
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

exports.leave = async(req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({
                status: "error",
                error: 'Project not found'
            });
        }

        if (project.owner_id == req.user_id) {
            console.error('User ' + req.user_id + ' is the owner of project ' + project.id + '.');
            return res.status(401).json({
                status: "error",
                error: 'User cannot leave owned project.'
            });
        }

        await leaveProject(req.user_id, project.id);

        return res.status(200).json({
            status: 'success',
            message: 'Project successfully left.'
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

exports.sendInvite = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body.invite;
        const sender = await User.findByPk(req.user_id);

        if (sender.email == email) {
            return res.status(401).json({
                status: "error",
                error: "Invite sender and receiver cannot be the same user."
            });
        }

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = "Project not found with id " + projectId + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const user = await User.findOne({where: { email: email }});
        if (!user) {
            const error = "User not found with email " + email + "."
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const isMember = await isUserMemberOfProject(user.id, project.id);
        if (isMember) {
            console.error("Recipient is already member of project " + project.id + ".");
            return res.status(401).json({
                status: "error",
                error: "Recipient is already member of project " + project.id + "."
            });
        }

        sendInvite(user.id, projectId);

        return res.status(201).json({
            status: 'success',
            message: 'Invite successfully sent.'
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