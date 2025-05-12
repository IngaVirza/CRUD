"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotFound = sendNotFound;
exports.sendInvalidUUID = sendInvalidUUID;
exports.sendInternalError = sendInternalError;
function sendNotFound(res, message) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
function sendInvalidUUID(res, message) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
function sendInternalError(res, message) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
