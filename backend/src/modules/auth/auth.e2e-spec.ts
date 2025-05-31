import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from '@mod/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AppModule } from '@/app.module';
import { clearDB } from '../../../test/clearDB';
import { createUniqueUserForTest } from '../../../test/utils/helpers';

describe('AuthService', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User)
    );
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await clearDB();
    await app.close();
  });

  beforeEach(async () => {
    await clearDB();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: UserRole.TENANT,
        privacyConsent: true,
        marketingConsent: false,
      };

      const result = await authService.register(registerDto);

      expect(result.message).toBe('User successfully registered');
      expect(result.user.email).toBe(registerDto.email);
      expect(result.user.firstName).toBe(registerDto.firstName);
      expect(result.user.lastName).toBe(registerDto.lastName);
      expect(result.user.role).toBe(registerDto.role);
      expect(result.user.id).toBeDefined();

      const savedUser = await userRepository.findOne({
        where: { email: registerDto.email },
      });
      expect(savedUser).toBeDefined();
      expect(savedUser!.slug).toContain('john-doe');
    });

    it('should hash the password correctly', async () => {
      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: UserRole.TENANT,
        privacyConsent: true,
        marketingConsent: false,
      };

      await authService.register(registerDto);

      const savedUser = await userRepository.findOne({
        where: { email: registerDto.email },
      });

      expect(savedUser!.passwordHash).toBeDefined();
      expect(savedUser!.passwordHash).not.toBe(registerDto.password);

      const isPasswordValid = await bcrypt.compare(
        registerDto.password,
        savedUser!.passwordHash!
      );
      expect(isPasswordValid).toBe(true);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const existingUser = await createUniqueUserForTest(userRepository, {
        email: 'existing@example.com',
      });

      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: existingUser.email,
        password: 'password123',
        role: UserRole.TENANT,
        privacyConsent: true,
        marketingConsent: false,
      };

      await expect(authService.register(registerDto)).rejects.toMatchObject({
        message: 'User with this email already exists',
      });
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const password = 'password123';
      const passwordHash = await bcrypt.hash(password, 10);

      const existingUser = await createUniqueUserForTest(userRepository, {
        email: 'test@example.com',
        passwordHash,
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.TENANT,
      });

      const loginDto: LoginDto = {
        email: existingUser.email,
        password,
      };

      const result = await authService.login(loginDto);

      expect(result.message).toBe('Login successful');
      expect(result.user.id).toBe(existingUser.id);
      expect(result.user.email).toBe(existingUser.email);
      expect(result.user.firstName).toBe(existingUser.firstName);
      expect(result.user.lastName).toBe(existingUser.lastName);
      expect(result.user.role).toBe(existingUser.role);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      await expect(authService.login(loginDto)).rejects.toMatchObject({
        message: 'Invalid email or password',
      });
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const passwordHash = await bcrypt.hash('correctpassword', 10);

      const existingUser = await createUniqueUserForTest(userRepository, {
        email: 'test@example.com',
        passwordHash,
      });

      const loginDto: LoginDto = {
        email: existingUser.email,
        password: 'wrongpassword',
      };

      await expect(authService.login(loginDto)).rejects.toMatchObject({
        message: 'Invalid email or password',
      });
    });
  });
});
