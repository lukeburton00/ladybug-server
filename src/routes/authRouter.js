const controller = require("../controllers/authController.js");
const { authenticate, authenticateRefresh } = require("../middlewares/authMiddleware.js")
const { validateRegisterUserParams, validateUpdatePasswordUserParams,
        validatePasswordUserParam, validateUserParams } 
        = require("../middlewares/validators/userParamsValidator.js");
var express = require('express');
var router = express.Router();

router.post(
    '/register', 
    validateRegisterUserParams, 
    controller.register);

router.post(
    '/login', 
    validateUserParams, 
    controller.login);

router.post(
    '/logout',
    controller.logout);

router.post(
    '/refresh-token', 
    validateUserParams, 
    authenticateRefresh,
    controller.refreshToken);

router.put(
    '/update-email', 
    authenticate, 
    validateUserParams, 
    controller.update_email);

router.put(
    '/update-password', 
    authenticate, 
    validateUpdatePasswordUserParams, 
    controller.update_password);

router.delete(
    '/delete', 
    authenticate, 
    validatePasswordUserParam, 
    controller.delete);
    
module.exports = router;