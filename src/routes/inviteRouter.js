const controller = require("../controllers/invitesController.js");
const { authenticate } = require("../middlewares/authMiddleware.js");
const { validateInviteIdParam } = require("../middlewares/validators/inviteParamsValidator.js");
var express = require('express');
var router = express.Router();

router.get(
    '/', 
    authenticate,
    controller.index);

router.put(
    '/:inviteId/accept',
    authenticate,
    validateInviteIdParam,
    controller.accept);

router.put(
    '/:inviteId/reject',
    authenticate,
    validateInviteIdParam,
    controller.accept);

module.exports = router;