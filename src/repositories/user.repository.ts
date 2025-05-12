import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
  private users: User[] = [];

  public async getAll(): Promise<User[]> {
    return this.users;
  }

  public async getById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async create(userData: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: uuidv4(), ...userData };
    this.users.push(newUser);
    return newUser;
  }
  public async update(
    id: string,
    updatedData: Partial<User>
  ): Promise<User | undefined> {
    const user = await this.getById(id);
    if (user) {
      Object.assign(user, updatedData);
      return user;
    }
    return undefined;
  }

  public async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}
export const userRepository = new UserRepository();
