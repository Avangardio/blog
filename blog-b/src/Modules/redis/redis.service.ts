import RegBlock from '@/Modules/redis/classes/regBlock';
import RegRequestData from '@/Modules/redis/classes/regRequestData';
import {Injectable} from "@nestjs/common";

@Injectable()
export default class RedisService {
  constructor(
    public readonly regBlock: RegBlock,
    public readonly regRequestData: RegRequestData,
  ) {}
}
