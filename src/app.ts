import { createServer } from 'http';
import { handleRequest } from './router';
import { config } from 'dotenv';

export function createApp() {
  config();
  return createServer((req, res) => {
    handleRequest(req, res);
  });
}
