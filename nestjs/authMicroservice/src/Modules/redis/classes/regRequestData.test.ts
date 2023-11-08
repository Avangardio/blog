import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import UserService from '@/Modules/postgres/user.service';
import Redis from 'ioredis';
import RegBlock from '@/Modules/redis/classes/regBlock';
import RegRequestData from '@/Modules/redis/classes/regRequestData';

const moduleMocker = new ModuleMocker(global);

describe('RegRequestData', () => {
  let regRequestData: RegRequestData;
  const redisMock = {
    pipeline: () => {
      return {
        hset: jest.fn().mockResolvedValue('OK'),
        expire: jest.fn().mockResolvedValue('OK'),
        exec: jest.fn().mockResolvedValue('OK'),
      };
    },
    hgetall: jest.fn().mockResolvedValue({
      userid: 'string',
      requestType: 'confirmation',
      emailCode: '232323',
      token: 'test@test.ru',
      email: 'test@test.ru',
      language: 'string',
      name: 'string',
      password: 'string',
    }),
    del: jest.fn().mockResolvedValue(1),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RegRequestData],
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

    regRequestData = moduleRef.get(RegRequestData);
  });
  it('Должен инициализироваться', function () {
    expect(regRequestData).toBeDefined();
  });
  it('setRequestData', async () => {
    const result = await regRequestData.setRequestData('test@test.ru', {
      token: '13231',
      requestType: 'confirmation',
      password: '13123',
      name: 'a',
      email: '2313',
      emailCode: '21332',
      language: 'RU',
    });
    expect(result).toBe('OK');
  });
  it('checkRequestData - confirmation', async () => {
    const result = await regRequestData.checkRequestData(
      'test@test.ru',
      '232323',
      'confirmation',
    );
    expect(result).toStrictEqual({
      userid: 'string',
      requestType: 'confirmation',
      emailCode: '232323',
      token: 'test@test.ru',
      email: 'test@test.ru',
      language: 'string',
      name: 'string',
      password: 'string',
    });
  });
  it('checkRequestData - restoration', async () => {
    redisMock.hgetall = jest.fn().mockResolvedValue({
      userid: 'string',
      requestType: 'restoration',
      emailCode: '232323',
      token: 'test@test.ru',
      email: 'test@test.ru',
      language: 'string',
      name: 'string',
    });
    const result = await regRequestData.checkRequestData(
      'test@test.ru',
      '232323',
      'restoration',
    );
    expect(result).toStrictEqual({
      userid: 'string',
      requestType: 'restoration',
      emailCode: '232323',
      token: 'test@test.ru',
      email: 'test@test.ru',
      language: 'string',
      name: 'string',
    });
  });
  it('deleteRequest', async () => {
    const result = await regRequestData.deleteRequest(['1']);
    expect(result).toEqual([1]);
  });
});
