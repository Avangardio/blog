import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import MockedClass = jest.MockedClass;
import Mocked = jest.Mocked;
import { AppService } from '@/app.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import RedisService from '@/Modules/redis/redis.service';
import UserService from '@/Modules/postgres/user.service';
import { RmqMailService } from '@/Modules/rabbitmq/rmq-mail.service';
import { Test } from '@nestjs/testing';

const moduleMocker = new ModuleMocker(global);

describe('AppService', () => {
  let appService: AppService;
  const redisMockService = {
    regBlock: {
      setBlock: jest.fn().mockResolvedValue('OK'),
      getBlock: jest.fn().mockResolvedValue(null),
      checkIfNotBlockExists: jest.fn().mockResolvedValue(null),
    },
    regRequestData: {
      setRequestData: jest.fn().mockResolvedValue('token'),
      checkRequestData: jest.fn().mockResolvedValue({
        userid: 'string',
        requestType: 'confirmation',
        emailCode: '232323',
        token: 'test@test.ru',
        email: 'test@test.ru',
        language: 'string',
        name: 'string',
        password: 'string',
      }),
      deleteRequest: jest.fn().mockResolvedValue([1]),
    },
  };
  const postgresServiceMock = {
    userService: {
      checkUserByEmail: jest.fn().mockResolvedValue({userid: 1, language: 'RU'}),
      checkUserById: jest.fn().mockResolvedValue(true),
      getUserHash: jest.fn().mockResolvedValue({ hash: '$2a$12$PjCeugmw7PfU6mp7QPkVZeyX6rDPOHOzHzfrT.tUhvOf1X6cZu9V.', userid: 1, username: 'username' }),
      findUserByEmail: jest.fn().mockResolvedValue(null),
      setNewUser: jest.fn().mockResolvedValue({ userid: 1, username: 'username' }),
      updateUserPassword: jest.fn().mockResolvedValue(undefined),
    },
  };
  const rmqMailServiceMock = {
    sendRestorationEmail: jest.fn().mockResolvedValue(undefined),
    sendConfirmationEmail: jest.fn().mockResolvedValue(undefined),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AppService],
    })
      .useMocker((token) => {
        if (token === RedisService) {
          return redisMockService;
        }
        if (token === PostgresService) {
          return postgresServiceMock;
        }
        if (token === RmqMailService) {
          return rmqMailServiceMock;
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

    appService = moduleRef.get(AppService);
  });
  it('Должен инициализироваться', function () {
    expect(appService).toBeDefined();
  });
  it('registration', async () => {
    const result = await appService.registration({
      email: 'email',
      name: 'name',
      password: 'password',
      language: 'RU',
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('REQ_SUCCESS');
    expect([11, 12].includes(result.payload.confirmationToken.length)).toBeTruthy();
  });
  it('confirmation', async () => {
    const result = await appService.confirmation({
      confirmationToken: 'token',
      emailCode: '232323',
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('CONFIRMATION_SUCCESS');
    expect(result.payload.username).toBe('username');
  });

  it('login', async () => {
    const result = await appService.login({
      email: 'test@email.com',
      password: '123132sadasd',
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('LOGIN_SUCCESS');
    expect(result.payload.username).toBe('username');
    expect(result.payload.userid).toBe(1);
  });
  it('sendRestorationRequest', async () => {
    const result = await appService.sendRestorationRequest({
      email: 'test@email.com',
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('REQ_SUCCESS');
    expect(typeof result.payload.confirmationToken).toBe('string');
  });
  it('validateRequestCode', async () => {
    const result = await appService.validateRequestCode({
      confirmationToken: 'token',
      emailCode: '121212',
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('VALIDATION_SUCCESS');
    expect(result.payload.confirmationToken).toBe('token');
    expect(result.payload.emailCode).toBe('121212');
  });
  it('validateUserid', async () => {
    const result = await appService.validateUserid(1);
    expect(result).toBe(true);
  });
  it('setNewPassword', async () => {
    const result = await appService.setNewPassword({
      password: 'string',
      re_password: 'string',
      confirmationToken: 'token',
      emailCode: '121212',
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('SETNEWPASSWORD_SUCCESS');
  });
});
