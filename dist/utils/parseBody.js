"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = parseBody;
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', (err) => reject(err));
    });
}
