import http from 'http';
import dotenv from 'dotenv';
import { parse } from 'url';
import { userRouter } from './routes/user.routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url || '', true);

  if (parsedUrl.pathname?.startsWith('/api/users')) {
    userRouter(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
});

export { server, PORT };
