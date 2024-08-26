import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }
  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    return this.authService.login(loginDTO);
  }
}
