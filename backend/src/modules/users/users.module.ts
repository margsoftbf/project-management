import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    // AdminController,
    // TenantController,
    // LandlordController,
  ],
  providers: [
    // AdminService,
    // TenantService,
    // LandlordService,
  ],
  exports: [],
})
export class UsersModule {}
