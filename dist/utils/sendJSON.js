"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSON = sendJSON;
exports.sendNotFound = sendNotFound;
exports.sendInvalidUUID = sendInvalidUUID;
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
function sendNotFound(res, message) {
    sendJSON(res, 404, { message });
}
function sendInvalidUUID(res, message) {
    sendJSON(res, 400, { message });
}
