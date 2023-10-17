import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceRoot {
  constructor(private readonly jwtService: JwtService) {}

  async signUser({ username, userid }: { username: string; userid: number }) {
    return await this.jwtService.signAsync({ username, userid });
  }
}
