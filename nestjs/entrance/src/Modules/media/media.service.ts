import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RmqMediaService } from '@/Modules/rabbitmq/rmq-media.service';

@Injectable()
export class MediaService {
  constructor(public readonly rmqMediaService: RmqMediaService) {}
}
