import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from '../auth/dto/login.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const bcryptSalt = await bcrypt.genSalt();

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      bcryptSalt,
    );

    const user = await this.userRepository.save(createUserDto);
    delete user.password;
    return user;
  }

  async findOne(request: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: request.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }
}
