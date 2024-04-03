const controller = require("../controllers/tasksController.js");
const { authenticate } = require("../middlewares/authMiddleware.js")
const { validateProjectIdParam, validateTaskAndProjectParam, validateAllTaskParams, validateTaskUserIdProjectMembership } = require("../middlewares/validators/taskParamsValidator.js");
const { validateUserProjectMembership } = require("../middlewares/validators/userParamsValidator.js");
var express = require('express');
var router = express.Router();

router.get(
    '/:projectId/tasks', 
    authenticate, 
    validateProjectIdParam, 
    validateUserProjectMembership, 
    controller.index);

router.post(
    '/:projectId/tasks', 
    authenticate, 
    validateCreateTaskParams, 
    validateUserProjectMembership, 
    validateAssignUserProjectMembership, 
    controller.create);

router.get(
    '/:projectId/tasks/:taskId', 
    authenticate, 
    validateTaskAndProjectParam, 
    validateUserProjectMembership,
    controller.show);

router.put(
    '/:projectId/tasks/:taskId', 
    authenticate, 
    validateAllTaskParams, 
    validateUserProjectMembership,
    validateAssignUserProjectMembership,
    controller.update);

router.delete(
    '/:projectId/tasks/:taskId', 
    authenticate, 
    validateTaskAndProjectParam, 
    validateUserProjectMembership,
    controller.delete);

module.exports = router;