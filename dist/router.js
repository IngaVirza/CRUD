"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
const sendJSON_1 = require("./utils/sendJSON");
const validateUUID_1 = require("./utils/validateUUID");
const user_controller_1 = require("./controllers/user.controller");
const parseBody_1 = require("./utils/parseBody");
async function handleRequest(req, res) {
    const url = req.url || '';
    const method = req.method || '';
    const match = url.match(/^\/api\/users\/?([a-fA-F0-9-]{36})?$/);
    if (!match) {
        (0, sendJSON_1.sendNotFound)(res, 'Endpoint not found');
        return;
    }
    const userId = match[1];
    if ((method === 'GET' || method === 'PUT' || method === 'DELETE') &&
        userId &&
        !(0, validateUUID_1.validateUUID)(userId)) {
        (0, sendJSON_1.sendInvalidUUID)(res, 'Invalid UUID provided');
        return;
    }
    switch (method) {
        case 'GET':
            if (userId) {
                await user_controller_1.userController.getById(res, userId);
            }
            else {
                await user_controller_1.userController.getAll(res);
            }
            break;
        case 'POST':
            try {
                const newUser = await (0, parseBody_1.parseBody)(req);
                await user_controller_1.userController.create(res, newUser);
            }
            catch (err) {
                (0, sendJSON_1.sendJSON)(res, 400, { message: 'Invalid input data' });
            }
            break;
        case 'PUT':
            if (!userId) {
                (0, sendJSON_1.sendInvalidUUID)(res, 'User ID is required for update');
                return;
            }
            try {
                const updatedUser = await (0, parseBody_1.parseBody)(req);
                await user_controller_1.userController.update(res, userId, updatedUser);
            }
            catch (err) {
                (0, sendJSON_1.sendJSON)(res, 400, { message: 'Invalid input data' });
            }
            break;
        case 'DELETE':
            if (!userId) {
                (0, sendJSON_1.sendInvalidUUID)(res, 'User ID is required for deletion');
                return;
            }
            await user_controller_1.userController.delete(res, userId);
            break;
        default:
            (0, sendJSON_1.sendNotFound)(res, 'Method not supported');
    }
}
