import cluster from 'cluster';
import { cpus } from 'os';
import { createServer, request } from 'http';
import { parse } from 'url';
import { config } from 'dotenv';

config();
const PORT = Number(process.env.PORT) || 4000;

const numCPUs = cpus().length - 1;
let currentWorker = 0;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: String(PORT + i + 1) });
  }
  const workers = Object.values(cluster.workers || {}).filter(Boolean);

  createServer((req, res) => {
    const workerPort = PORT + ((currentWorker % numCPUs) + 1);
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const options = {
      hostname: 'localhost',
      port: workerPort,
      path: url.pathname + url.search,
      method: req.method,
      headers: req.headers,
    };

    const proxy = request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
    currentWorker++;
  }).listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
  });
} else {
  import('./app').then(({ createApp }) => {
    const app = createApp();
    const workerPort = Number(process.env.PORT) || PORT;
    app.listen(workerPort, () => {
      console.log(`Worker ${process.pid} started on port ${workerPort}`);
    });
  });
}
