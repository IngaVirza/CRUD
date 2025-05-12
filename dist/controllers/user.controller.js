"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const sendJSON_1 = require("../utils/sendJSON");
class UserController {
    async getAll(res) {
        try {
            const users = await user_repository_1.userRepository.getAll();
            (0, sendJSON_1.sendJSON)(res, 200, users);
        }
        catch (error) {
            (0, sendJSON_1.sendJSON)(res, 500, { message: 'Error fetching users' });
        }
    }
    async getById(res, userId) {
        try {
            const user = await user_repository_1.userRepository.getById(userId);
            if (user) {
                (0, sendJSON_1.sendJSON)(res, 200, user);
            }
            else {
                (0, sendJSON_1.sendJSON)(res, 404, { message: 'User not found' });
            }
        }
        catch (error) {
            (0, sendJSON_1.sendJSON)(res, 500, { message: 'Error fetching user' });
        }
    }
    async create(res, newUser) {
        try {
            const createdUser = await user_repository_1.userRepository.create(newUser);
            (0, sendJSON_1.sendJSON)(res, 201, createdUser);
        }
        catch (error) {
            (0, sendJSON_1.sendJSON)(res, 500, { message: 'Error creating user' });
        }
    }
    async update(res, userId, updatedUser) {
        try {
            const user = await user_repository_1.userRepository.update(userId, updatedUser);
            if (user) {
                (0, sendJSON_1.sendJSON)(res, 200, user);
            }
            else {
                (0, sendJSON_1.sendJSON)(res, 404, { message: 'User not found' });
            }
        }
        catch (error) {
            (0, sendJSON_1.sendJSON)(res, 500, { message: 'Error updating user' });
        }
    }
    async delete(res, userId) {
        try {
            const deleted = await user_repository_1.userRepository.delete(userId);
            if (deleted) {
                (0, sendJSON_1.sendJSON)(res, 200, { message: 'User deleted successfully' });
            }
            else {
                (0, sendJSON_1.sendJSON)(res, 404, { message: 'User not found' });
            }
        }
        catch (error) {
            (0, sendJSON_1.sendJSON)(res, 500, { message: 'Error deleting user' });
        }
    }
}
exports.userController = new UserController();
