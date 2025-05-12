import { IncomingMessage, ServerResponse } from 'http';
import { userController } from '../controllers/user.controller';
import { sendNotFound, sendInvalidUUID, sendJSON } from '../utils/sendJSON';
import { parseBody } from '../utils/parseBody';
import { validateUUID } from '../utils/validateUUID';

export async function userRouter(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const method = req.method || '';

  const match = url.match(/^\/api\/users\/?([a-fA-F0-9-]{36})?$/);
  if (!match) {
    sendNotFound(res, 'Endpoint not found');
    return;
  }

  const userId = match[1];

  if (
    (method === 'GET' || method === 'PUT' || method === 'DELETE') &&
    userId &&
    !validateUUID(userId)
  ) {
    sendInvalidUUID(res, 'Invalid UUID provided');
    return;
  }

  switch (method) {
    case 'GET':
      if (userId) {
        await userController.getById(res, userId);
      } else {
        await userController.getAll(res);
      }
      break;

    case 'POST':
      try {
        const newUser = await parseBody(req);
        await userController.create(res, newUser);
      } catch (err) {
        sendJSON(res, 400, { message: 'Invalid input data' });
      }
      break;

    case 'PUT':
      if (!userId) {
        sendInvalidUUID(res, 'User ID is required for update');
        return;
      }
      try {
        const updatedUser = await parseBody(req);
        await userController.update(res, userId, updatedUser);
      } catch (err) {
        sendJSON(res, 400, { message: 'Invalid input data' });
      }
      break;

    case 'DELETE':
      if (!userId) {
        sendInvalidUUID(res, 'User ID is required for deletion');
        return;
      }
      await userController.delete(res, userId);
      break;

    default:
      sendNotFound(res, 'Method not supported');
  }
}
