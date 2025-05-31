import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  ExceptionConstants,
  UnauthorizedException,
} from '../../shared/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        ExceptionConstants.AuthErrors.userAlreadyExists
      );
    }
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
      role: registerDto.role,
      privacyConsent: registerDto.privacyConsent,
      marketingConsent: registerDto.marketingConsent || false,
      slug: `${registerDto.firstName}-${registerDto.lastName}-${Date.now()}`.toLowerCase(),
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'User successfully registered',
      user: {
        id: savedUser.id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        role: savedUser.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials
      );
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials
      );
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
