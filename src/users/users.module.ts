import { SequelizeModule } from '@nestjs/sequelize'
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports:[
		SequelizeModule.forFeature([Users]),
		RolesModule,
		forwardRef(() => AuthModule) 
	],
  providers: [UsersService],
	controllers: [UsersController],
	exports:[UsersService],

})
export class UsersModule {}
