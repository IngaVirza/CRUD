"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    getAll() {
        return user_repository_1.userRepository.getAll();
    }
    getById(id) {
        return user_repository_1.userRepository.getById(id);
    }
    create(userData) {
        return user_repository_1.userRepository.create(userData);
    }
    update(id, userData) {
        return user_repository_1.userRepository.update(id, userData);
    }
    delete(id) {
        return user_repository_1.userRepository.delete(id);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
