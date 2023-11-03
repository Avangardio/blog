import {Injectable} from '@nestjs/common';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import {NoUserError, UserExistsError,} from '@/Errors/postgresErrors/postgresErrors';
import {User} from '@/Modules/postgres/Entities/user.entity';
import {ConfirmationEntityDto} from '@/DTO/redisEntities/redisEntities';

@Injectable()
export default class UserService {
    constructor(private readonly userRepo: UserRepo) {
    }

    async checkUserByEmail(email: string, should: boolean) {
        const user = await this.userRepo.findUserByEmail(email);
        //Если есть пользователь - выбрасываем ошибку
        if (!!user !== should)
            throw new UserExistsError(should ? 'USER_NOT_EXISTS' : 'USER_EXISTS');
        return user;
    }

    async checkUserById(userid: number) {
        const userCheck = await this.userRepo.findUserByUserId(userid);
        return !!userCheck;
    }

    async getUserHash(email: string) {
        const user = await this.userRepo.getUserPassword(email);
        //не будем говорить пользователям, что пользователя не существует точно
        if (!user) throw new NoUserError('WRONG_PASSWORD');
        return user;
    }

    findUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findUserByEmail(email);
    }

    setNewUser(data: ConfirmationEntityDto) {
        return this.userRepo.setNewUser(data);
    }

    updateUserPassword(userid: string, password: string) {
        return this.userRepo.updateUserPassword(userid, password);
    }
}
