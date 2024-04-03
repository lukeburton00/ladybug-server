var { body, param, validationResult } = require('express-validator');

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

validateProjectNameParam = async (req, res, next) => {
    await body('project.name').notEmpty().escape().withMessage('Project name cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateProjectParams = async (req, res, next) => {
    await param('projectId').notEmpty().escape().withMessage('Project ID cannot be empty.').run(req);
    await body('project.name').notEmpty().escape().withMessage('Project name cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

module.exports = {
    validateProjectIdParam,
    validateProjectNameParam,
    validateProjectParams
}