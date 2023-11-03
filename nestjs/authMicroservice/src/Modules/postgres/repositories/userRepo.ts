import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '@/Modules/postgres/Entities/user.entity';
import {DatabasePGError} from '@/Errors/postgresErrors/postgresErrors';
import {Injectable} from '@nestjs/common';
import {ConfirmationEntityDto} from '@/DTO/redisEntities/redisEntities';

@Injectable()
export default class UserRepo {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    findUserByUserId(userid: number) {
        //Пытаемся получить данные по uid
        return (
            this.userRepository
                .findOne({
                    where: {userid: userid},
                    cache: {
                        id: `user_${userid}`,
                        milliseconds: 120_000,
                    },
                })
                //для случая деградации возвращаем true
                .catch(() => true)
        );
    }

    findUserByEmail(email: string): Promise<User | null> {
        //Пытаемся получить данные по имейлу
        return this.userRepository
            .findOne({
                where: {email: email},
            })
            .catch(() => {
                throw new DatabasePGError('POSTGRES_ERROR');
            });
    }

    async setNewUser(data: ConfirmationEntityDto) {
        //Создаем данные для вставки в базу
        const newUser = this.userRepository.create({
            email: data.email,
            username: data.name,
            hash: data.password,
            language: data.language,
        });
        //Пытаемся создать пользователя
        return await this.userRepository.save(newUser).catch(() => {
            throw new DatabasePGError('POSTGRES_ERROR');
        });
    }

    async updateUserPassword(userid: string, password: string) {
        //Обновляем пользователя
        this.userRepository
            .update({userid: +userid}, {hash: password})
            .catch(() => {
                throw new DatabasePGError('POSTGRES_ERROR');
            });
    }

    getUserPassword(email: string) {
        return this.userRepository
            .findOne({
                where: {email},
                select: ['hash', 'userid', 'username'],
            })
            .catch(() => {
                throw new DatabasePGError('POSTGRES_ERROR');
            });
    }
}
