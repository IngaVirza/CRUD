import { IncomingMessage, ServerResponse } from 'http';
export function getReqData(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => resolve(JSON.parse(body)));
    req.on('error', (err) => reject(err));
  });
}
export function getUserIdFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/\/users\/([a-f0-9-]+)/i);
  return match ? match[1] : null;
}

export function sendJSON(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}
export function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

export function sendNotFound(res: ServerResponse, message: string) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}

export function sendInvalidUUID(res: ServerResponse, message: string) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}
export function isUUID(str: string): boolean {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(str);
}
