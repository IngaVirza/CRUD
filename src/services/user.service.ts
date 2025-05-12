import { User } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';

export class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getById(id: string) {
    return userRepository.getById(id);
  }

  create(userData: User) {
    return userRepository.create(userData);
  }

  update(id: string, userData: Partial<User>) {
    return userRepository.update(id, userData);
  }

  delete(id: string) {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
