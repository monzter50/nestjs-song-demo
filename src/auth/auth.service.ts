import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { PayloadType } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    const user = await this.userService.findOne(loginDTO);
    const match = bcrypt.compare(loginDTO.password, user.password);
    if (!match) {
      throw new Error('Invalid credentials');
    }
    delete user.password;
    const payload: PayloadType = { email: user.email, userId: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
