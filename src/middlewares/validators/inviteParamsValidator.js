var { body, param, validationResult } = require('express-validator');

validateUserProjectIdParams= async (req, res, next) => {
    await body('invite.email').notEmpty().escape().withMessage('Recipient email cannot be empty.').run(req);
    await param('projectId').notEmpty().escape().withMessage('Project ID cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
};

validateInviteProjectIdParams = async (req, res, next) => {
    await param('inviteId').notEmpty().escape().withMessage('Invite ID cannot be empty.').run(req);
    await param('projectId').notEmpty().escape().withMessage('Project ID cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
};

validateInviteIdParam = async (req, res, next) => {
    await param('inviteId').notEmpty().escape().withMessage('Invite ID cannot be empty.').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
};

module.exports = {
    validateUserProjectIdParams,
    validateInviteProjectIdParams,
    validateInviteIdParam
};
