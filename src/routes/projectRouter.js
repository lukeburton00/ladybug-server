const controller = require("../controllers/projectsController.js");
const { authenticate } = require("../middlewares/authMiddleware.js")
const { validateProjectIdParam, validateProjectNameParam, 
        validateProjectParams } = require("../middlewares/validators/projectParamsValidator.js");
const { validateUserProjectMembership } = require("../middlewares/validators/userParamsValidator.js");
const { validateUserProjectIdParams } = require("../middlewares/validators/inviteParamsValidator.js");
var express = require('express');
var router = express.Router();

router.get(
    '/', 
    authenticate, 
    controller.index);

router.post(
    '/', 
    authenticate, 
    validateProjectNameParam, 
    controller.create);

router.post(
    '/:projectId/sendInvite', 
    authenticate,
    validateUserProjectMembership, 
    validateUserProjectIdParams,
    controller.sendInvite);

router.get(
    '/:projectId', 
    authenticate, 
    validateProjectIdParam, 
    controller.show);

router.put(
    '/:projectId', 
    authenticate, 
    validateProjectParams, 
    controller.update);

router.delete(
    '/:projectId', 
    authenticate, 
    validateProjectIdParam, 
    controller.delete);

router.delete(
    '/:projectId/leave',
    authenticate, 
    validateProjectIdParam,
    validateUserProjectMembership,
    controller.leave);

module.exports = router;