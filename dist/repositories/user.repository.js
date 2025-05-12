"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const uuid_1 = require("uuid");
class UserRepository {
    users = [];
    async getAll() {
        return this.users;
    }
    async getById(id) {
        return this.users.find((user) => user.id === id);
    }
    async create(userData) {
        const newUser = { id: (0, uuid_1.v4)(), ...userData };
        this.users.push(newUser);
        return newUser;
    }
    async update(id, updatedData) {
        const user = await this.getById(id);
        if (user) {
            Object.assign(user, updatedData);
            return user;
        }
        return undefined;
    }
    async delete(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}
exports.userRepository = new UserRepository();
