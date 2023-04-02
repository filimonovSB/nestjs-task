import { JwtModule } from '@nestjs/jwt'
import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
	imports:[
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret:'secret',
			signOptions:{
				expiresIn:"15m"
			}
		}),
	],
  providers: [AuthService],
	exports:[
		AuthService,
		JwtModule
	],
	controllers: [AuthController]
})
export class AuthModule {}
