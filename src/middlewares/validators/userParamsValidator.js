var { body, validationResult } = require('express-validator');
const { isUserMemberOfProject } = require('../../services/projects/projectMembershipService.js');

validateRegisterUserParams = async (req, res, next) => {
    await body('user.email').isEmail().escape().withMessage('Invalid email format').run(req);
    await body('user.password').isLength(8).escape().withMessage('Invalid password').run(req);
    await body('user.password_confirmation').isLength(8).escape().withMessage('Invalid password confirmation').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validatePasswordUserParam = async (req, res, next) => {
    await body('user.password').notEmpty().isLength(8).escape().withMessage('Invalid password').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateUpdatePasswordUserParams = async (req, res, next) => {
    await body('user.password').notEmpty().isLength(8).escape().withMessage('Invalid password').run(req);
    await body('user.password_confirmation').notEmpty().escape().withMessage('Invalid password confirmation').run(req);
    await body('user.current_password').notEmpty().isLength(8).escape().withMessage('Invalid current password').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateUserParams = async (req, res, next) => {
    await body('user.email').isEmail().escape().withMessage('Invalid email format').run(req);
    await body('user.password').isLength(8).escape().withMessage('Invalid password').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ 
            error: errors.array() });
    }

    next();
}

validateUserProjectMembership = async (req, res, next) => {
    const isMember = await isUserMemberOfProject(req.user_id, req.params.projectId);
    if (!isMember) {
        console.error("User " + req.user_id + " is not a member of project " + projectId + ".");
        return res.status(401).json({
            status: "error",
            error: "You do not have permission to perform this action."
        });
    }

    next();
}

module.exports = {
    validateRegisterUserParams,
    validateUpdatePasswordUserParams,
    validatePasswordUserParam,
    validateUserParams,
    validateUserProjectMembership,
}