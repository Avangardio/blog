import { BcryptFuncError } from '@/Errors/bcryptErrors/bcryptErrors';
import bcrypt from 'bcrypt';

export default function hashPasswordWithSalt(password: string) {
  //генерируем соль - 10 раундов
  const saltRounds = 10;
  // Генерируем хеш пароля
  return bcrypt.hash(password, saltRounds).catch(() => {
    throw new BcryptFuncError('BCRYPT_ERROR');
  });
}
