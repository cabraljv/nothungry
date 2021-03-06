import { getRepository } from 'typeorm';

import User from '../models/User';

export async function verifyUser(phone: string): Promise<boolean> {
  const usersRepo = getRepository(User);

  const user = await usersRepo.findOne({ where: { whatsapp: phone } });

  if (user) return true;

  return false;
}
