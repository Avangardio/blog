import {RegistrationBodyDto} from '@/DTO/auth/registration';

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
            type: 1,
        },
        {
            status: 500,
            description: 'Internal server error',
            type: 1,
        },
        {
            status: 500,
            description: 'Internal server error',
            type: 1,
        },
    ],
};

export default RegistrationMetadata;
