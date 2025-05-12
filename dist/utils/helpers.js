"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReqData = getReqData;
exports.getUserIdFromUrl = getUserIdFromUrl;
exports.sendJSON = sendJSON;
exports.parseBody = parseBody;
exports.sendNotFound = sendNotFound;
exports.sendInvalidUUID = sendInvalidUUID;
exports.isUUID = isUUID;
function getReqData(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => resolve(JSON.parse(body)));
        req.on('error', (err) => reject(err));
    });
}
function getUserIdFromUrl(url) {
    if (!url)
        return null;
    const match = url.match(/\/users\/([a-f0-9-]+)/i);
    return match ? match[1] : null;
}
function sendJSON(res, statusCode, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch {
                reject(new Error('Invalid JSON'));
            }
        });
    });
}
function sendNotFound(res, message) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
function sendInvalidUUID(res, message) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
function isUUID(str) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(str);
}
