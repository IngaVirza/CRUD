"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const url_1 = require("url");
const user_routes_1 = require("./routes/user.routes");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer((req, res) => {
    const parsedUrl = (0, url_1.parse)(req.url || '', true);
    if (parsedUrl.pathname?.startsWith('/api/users')) {
        (0, user_routes_1.userRouter)(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
