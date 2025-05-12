"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUID = validateUUID;
const uuid_1 = require("uuid");
function validateUUID(uuid) {
    return (0, uuid_1.validate)(uuid);
}
