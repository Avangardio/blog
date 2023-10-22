import { Injectable } from "@nestjs/common";
import UserService from "@/Modules/postgres/user.service";

@Injectable()
export default class PostgresService {
  constructor(public readonly userService: UserService) {
  }
}
