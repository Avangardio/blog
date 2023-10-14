import {
  ActiveBlockError,
  DatabaseRedisError,
} from '@/Errors/redisErrors/redisErrors';
import { DatabasePGError } from '@/Errors/postgresErrors/postgresErrors';
import { ApiProperty } from '@nestjs/swagger';

class RegistrationBodyDto implements IRegistrationBody {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  password: string;
}

const RegistrationMetadata = {
  description: 'Create a new user',
  requestBody: {
    description: 'User data',
    type: RegistrationBodyDto,
  },
  responses: [
    {
      status: 200,
      description: 'Successfully retrieved users',
      isArray: true,
    },
    {
      status: 400,
      description: 'Bad request',
      type: ActiveBlockError,
    },
    {
      status: 500,
      description: 'Internal server error',
      type: DatabasePGError,
    },
    {
      status: 500,
      description: 'Internal server error',
      type: DatabaseRedisError,
    },
  ],
};

export default RegistrationMetadata;