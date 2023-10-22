import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import GuardsService from '@/Guards/guards.service';

type userdataJWT = {
  username: string;
  userid: number;
};

@Injectable()
export class JwtServiceRoot {
  constructor(
    private readonly jwtService: JwtService,
    private readonly guardsService: GuardsService,
  ) {}

  async signUser({ username, userid }: userdataJWT) {
    return await this.jwtService.signAsync({ username, userid });
  }
  async validateUserdata(userdata: string) {
    //если жвт невалиден или просрочен
    const verifiedUser = await this.jwtService
      .verifyAsync<userdataJWT>(userdata)
      .catch(() => false);
    //возвращаем false
    if (!verifiedUser) return false;
    const { userid, username } = verifiedUser as userdataJWT;
    //Теперь надо проверить валидность токена из базы данных, ошибки ловятся внутри
    const checkedUser = await this.guardsService.validateUserid(userid);
    //если пользователь не найден, то возвращаем false
    if (!checkedUser) return false;
    //Иначе, подписываем обновленный куки
    const newToken = await this.signUser(verifiedUser as userdataJWT);
    return { newToken, userid, username };
  }
}
