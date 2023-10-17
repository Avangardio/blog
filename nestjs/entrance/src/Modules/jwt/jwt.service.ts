import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

Injectable();
export class JwtServiceRoot {
  constructor(private readonly jwtService: JwtService) {}

  async signUser({ username, userid }: { username: string; userid: number }) {
    console.log(this.jwtService)
    return await this.jwtService.signAsync({ username, userid });
  }
}
