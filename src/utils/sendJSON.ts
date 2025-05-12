import { ServerResponse } from 'http';

export function sendJSON(
  res: ServerResponse,
  statusCode: number,
  data: any
): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export function sendNotFound(res: ServerResponse, message: string): void {
  sendJSON(res, 404, { message });
}

export function sendInvalidUUID(res: ServerResponse, message: string): void {
  sendJSON(res, 400, { message });
}
