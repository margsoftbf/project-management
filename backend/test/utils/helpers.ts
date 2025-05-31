import { User, UserRole } from '@mod/users/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export const createUserForTest = async (
  userRepository: Repository<User>,
  user: Partial<User> = {}
): Promise<User> => {
  const userEntity: Partial<User> = {
    id: uuidv4(),
    slug: `test-user-${Math.random().toString(36).slice(7)}`,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    passwordHash: null,
    phoneNumber: null,
    avatarUrl: null,
    role: UserRole.TENANT,
    address: null,
    city: null,
    postalCode: null,
    emailVerified: false,
    privacyConsent: true,
    marketingConsent: false,
    isActive: true,
    createdByAdmin: false,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...user,
  };

  return await userRepository.save(userEntity);
};

export const createUniqueUserForTest = async (
  userRepository: Repository<User>,
  overrides: Partial<User> = {}
): Promise<User> => {
  const randomId = Math.random().toString(36).slice(7);
  const user: Partial<User> = {
    id: uuidv4(),
    slug: `unique-user-${randomId}`,
    firstName: 'Unique',
    lastName: 'TestUser',
    email: `unique-${randomId}@example.com`,
    passwordHash: null,
    phoneNumber: `+48${Math.floor(100_000_000 + Math.random() * 900_000_000)}`,
    avatarUrl: null,
    role: UserRole.TENANT,
    address: null,
    city: null,
    postalCode: null,
    emailVerified: true,
    privacyConsent: true,
    marketingConsent: false,
    isActive: true,
    createdByAdmin: false,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  };

  return await userRepository.save(user);
};

export const generateRandomString = (length: number = 10): string => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
