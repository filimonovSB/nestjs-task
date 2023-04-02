import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/users.model';
import { Profiles } from './profiles/profiles.model';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { UserRoles } from './roles/users-roles.model';

import { TextBlockModule } from './text-block/text-block.module';
import { FilesModule } from './files/files.module';
import { TextBlock } from './text-block/text-block.model';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path'
import { Groups } from './text-block/group.model';
import { Files } from './files/files.model';

@Module({
  imports: [
		UsersModule,
	  ProfilesModule,
	  AuthModule,
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		ConfigModule.forRoot({
			envFilePath:'.env'
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host:process.env.HOST_db,
			port:Number(process.env.PORT_DB),
			username:process.env.USERNAME_DB,
			password:process.env.PASSWORD_DB,
			database:process.env.NAME_DB,
			models:[Users, Profiles, Roles, UserRoles, TextBlock, Groups, Files],
			autoLoadModels:true,
		}),
		RolesModule,
		TextBlockModule,
		FilesModule,
		
	]
  
})
export class AppModule {}

