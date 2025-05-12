import { ServerResponse } from 'http';

export function sendNotFound(res: ServerResponse, message: string) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}

export function sendInvalidUUID(res: ServerResponse, message: string) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}

export function sendInternalError(res: ServerResponse, message: string) {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}
