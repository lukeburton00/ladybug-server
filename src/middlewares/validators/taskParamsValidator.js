var { body, param, validationResult } = require('express-validator');
const { isUserMemberOfProject } = require('../../services/projects/projectMembershipService.js');
const User = require('../../models/user');

validateProjectIdParam = async (req, res, next) => {
    await param('projectId').notEmpty().escape().withMessage('Project ID cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateTaskAndProjectParam = async (req, res, next) => {
    await param('projectId').notEmpty().escape().withMessage('Project ID cannot be empty.').run(req);
    await param('taskId').notEmpty().escape().withMessage('Task ID cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateCreateTaskParams = async (req, res, next) => {
    await param('projectId').notEmpty().escape().withMessage('Task ID cannot be empty.').run(req);
    await body('task.title').notEmpty().escape().withMessage('Task title cannot be empty.').run(req);
    await body('task.description').optional().escape().run(req);
    await body('task.external_link').optional().escape().run(req);
    await body('task.user_id').optional().run(req);
    await body('task.status').notEmpty().escape().withMessage('Task status cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateAllTaskParams = async (req, res, next) => {
    await param('projectId').notEmpty().escape().withMessage('Task ID cannot be empty.').run(req);
    await param('taskId').notEmpty().escape().withMessage('Task ID cannot be empty.').run(req);
    await body('task.title').notEmpty().escape().withMessage('Task title cannot be empty.').run(req);
    await body('task.description').optional().escape().run(req);
    await body('task.external_link').optional().escape().run(req);
    await body('task.user_id').optional().run(req);
    await body('task.status').notEmpty().escape().withMessage('Task status cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

// For checking if a user to be assigned to a task is a member of the project
validateAssignUserProjectMembership = async (req, res, next) => {
    const { user_id } = req.body.task;
    if (user_id) {
        const assigned_user = await User.findByPk(user_id);
        if (!assigned_user) {
            const error = 'User not found with id ' + user_id;
            console.error(error);
            return res.status(404).json({
                status: "error",
                error: error
            });
        }

        const isAssignedUserMember = await isUserMemberOfProject(user_id, req.params.projectId);
        if (!isAssignedUserMember) {
            console.error("User " + req.user_id + " is not a member of project " + projectId + ".");
            return res.status(401).json({
                status: 'error',
                error: 'User + ' + user_id + ' is not a member of project ' + projectId + '.'
            });
        }
    }

    next();
}

module.exports = {
    validateProjectIdParam,
    validateTaskAndProjectParam,
    validateAllTaskParams,
    validateAssignUserProjectMembership
}