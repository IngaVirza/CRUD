"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const http_1 = require("http");
const router_1 = require("./router");
const dotenv_1 = require("dotenv");
function createApp() {
    (0, dotenv_1.config)();
    return (0, http_1.createServer)((req, res) => {
        (0, router_1.handleRequest)(req, res);
    });
}
