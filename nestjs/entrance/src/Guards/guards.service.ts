import Redis from 'ioredis';
import {Injectable,} from '@nestjs/common';
import {InjectRedis} from '@liaoliaots/nestjs-redis';

@Injectable()
export default class GuardsService {
    constructor(@InjectRedis() private readonly redis: Redis) {
    }

    private generateCSRF(length: number): string {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        const now = new Date();
        const seconds = now.getSeconds();
        return result + seconds.toString();
    }

    async setCSRF(userid: string) {
        const csrf = this.generateCSRF(8);
        await this.redis.setex(csrf, 84000, userid).catch((e) => e.message);
    }

    async getUserIdFromCSRF(csrf: string): Promise<string> {
        return await this.redis.get(csrf).catch((e) => e.message);
    }

    async deleteCSRF(csrf: string) {
        await this.redis.del(csrf).catch((e) => e.message);
    }
}
