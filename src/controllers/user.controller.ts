import { ServerResponse } from 'http';
import { User } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';
import { sendJSON } from '../utils/sendJSON';

class UserController {
  async getAll(res: ServerResponse): Promise<void> {
    try {
      const users = await userRepository.getAll();
      sendJSON(res, 200, users);
    } catch (error) {
      sendJSON(res, 500, { message: 'Error fetching users' });
    }
  }

  async getById(res: ServerResponse, userId: string): Promise<void> {
    try {
      const user = await userRepository.getById(userId);
      if (user) {
        sendJSON(res, 200, user);
      } else {
        sendJSON(res, 404, { message: 'User not found' });
      }
    } catch (error) {
      sendJSON(res, 500, { message: 'Error fetching user' });
    }
  }

  async create(res: ServerResponse, newUser: User): Promise<void> {
    try {
      const createdUser = await userRepository.create(newUser);
      sendJSON(res, 201, createdUser);
    } catch (error) {
      sendJSON(res, 500, { message: 'Error creating user' });
    }
  }

  async update(
    res: ServerResponse,
    userId: string,
    updatedUser: User
  ): Promise<void> {
    try {
      const user = await userRepository.update(userId, updatedUser);
      if (user) {
        sendJSON(res, 200, user);
      } else {
        sendJSON(res, 404, { message: 'User not found' });
      }
    } catch (error) {
      sendJSON(res, 500, { message: 'Error updating user' });
    }
  }

  async delete(res: ServerResponse, userId: string): Promise<void> {
    try {
      const deleted = await userRepository.delete(userId);
      if (deleted) {
        sendJSON(res, 200, { message: 'User deleted successfully' });
      } else {
        sendJSON(res, 404, { message: 'User not found' });
      }
    } catch (error) {
      sendJSON(res, 500, { message: 'Error deleting user' });
    }
  }
}

export const userController = new UserController();
