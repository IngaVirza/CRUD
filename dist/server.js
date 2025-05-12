"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const http_1 = require("http");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = Number(process.env.PORT) || 4000;
const numCPUs = (0, os_1.cpus)().length - 1;
let currentWorker = 0;
if (cluster_1.default.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork({ PORT: String(PORT + i + 1) });
    }
    const workers = Object.values(cluster_1.default.workers || {}).filter(Boolean);
    (0, http_1.createServer)((req, res) => {
        const workerPort = PORT + ((currentWorker % numCPUs) + 1);
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const options = {
            hostname: 'localhost',
            port: workerPort,
            path: url.pathname + url.search,
            method: req.method,
            headers: req.headers,
        };
        const proxy = (0, http_1.request)(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
        });
        req.pipe(proxy, { end: true });
        currentWorker++;
    }).listen(PORT, () => {
        console.log(`Load balancer running on port ${PORT}`);
    });
}
else {
    Promise.resolve().then(() => __importStar(require('./app'))).then(({ createApp }) => {
        const app = createApp();
        const workerPort = Number(process.env.PORT) || PORT;
        app.listen(workerPort, () => {
            console.log(`Worker ${process.pid} started on port ${workerPort}`);
        });
    });
}
