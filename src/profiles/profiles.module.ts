import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profiles } from './profiles.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports:[
		SequelizeModule.forFeature([Profiles]),
		UsersModule,
		AuthModule

	],
  providers: [ProfilesService],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
