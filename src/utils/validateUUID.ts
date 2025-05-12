import { validate as isUUID } from 'uuid';

export function validateUUID(uuid: string): boolean {
  return isUUID(uuid);
}
