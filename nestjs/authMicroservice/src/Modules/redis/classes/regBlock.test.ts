import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import UserService from '@/Modules/postgres/user.service';
import Redis from 'ioredis';
import RegBlock from '@/Modules/redis/classes/regBlock';

const moduleMocker = new ModuleMocker(global);

describe('RegBlock', () => {
  let regBlock: RegBlock;
  const redisMock = {
    setex: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue('true'),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RegBlock],
    })
      .useMocker((token) => {
        if (token === 'RedisModule:default') {
          return redisMock;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    regBlock = moduleRef.get(RegBlock);
  });
  it('Должен инициализироваться', function () {
    expect(regBlock).toBeDefined();
  });
  it('setBlock', async () => {
    const result = await regBlock.setBlock('test@test.ru');
    expect(result).toBe('OK');
  });
  it('getBlock', async () => {
    const result = await regBlock.getBlock('test@test.ru');
    expect(result).toBe('true');
  });
  it('checkIfNotBlockExists - блок есть', async () => {
    await expect(
      regBlock.checkIfNotBlockExists('test@test.ru'),
    ).rejects.toThrow('ACTIVE_BLOCK');
  });
  it('checkIfNotBlockExists - блока нет', async () => {
    regBlock.getBlock = jest.fn().mockResolvedValue(null);
    const result = await regBlock.checkIfNotBlockExists('test@test.ru');
    expect(result).toBe(true);
  });
});
