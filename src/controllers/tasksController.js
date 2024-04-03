const Task = require("../models/task.js");
const Project = require("../models/project.js");
const User = require("../models/user.js");

exports.index = async(req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = 'Project not found with id ' + projectId;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const tasks = await Task.findAll({ where: {project_id: projectId } });

        return res.status(200).json({
            status: "success",
            tasks: tasks
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

exports.show = async(req, res) => {
    try {
        const { projectId, taskId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = 'Project not found with id ' + projectId;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({
                status: "error",
                error: 'Task not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            task: task
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
        const { projectId } = req.params;
        const { title, status, description, external_link, user_id } = req.body.task;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = 'Project not found with id ' + projectId;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const task = await Task.create({
            title: title, 
            description: description, 
            status: status, 
            external_link: external_link,
            user_id: user_id,
            project_id: projectId});

        project.addTask(task);

        return res.status(201).json({
            status: 'success',
            message: 'Task successfully created'
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

exports.update = async(req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const { title, description, status, external_link, user_id } = req.body.task;

        const task = await Task.findByPk(taskId);
        if (!task) {
            console.error("Task not found.");
            return res.status(404).json({ 
                error: "Task not found" });
        }

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = 'Project not found with id ' + projectId;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        await task.update({
            title: title, 
            description: description, 
            status: status,
            external_link: external_link,
            user_id: user_id
        });

        return res.status(201).json({
            status: 'success',
            message: 'Task successfully updated'
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
        const { projectId, taskId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) {
            const error = 'Project not found with id ' + projectId;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }
        
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({
                status: "error",
                error: 'Task not found'
            });
        }

        await task.destroy();

        return res.status(204).json({
            status: 'success',
            message: 'Task successfully deleted.'
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