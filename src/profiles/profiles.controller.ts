import { Controller, Post, Body, UseGuards, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegistrationProfileUserDto } from './dto/RegistrationProfileUser.dto';
import { ProfilesService } from './profiles.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Profiles } from './profiles.model';

@ApiTags('Профиль')
@Controller('profiles')
export class ProfilesController {

	constructor(
		private profileService: ProfilesService
	){}

	@ApiOperation({summary: 'Регестрация пользователя и создание профиля'})
  @ApiResponse({status: 201})
	@Post('/registration')
	registration(@Body() regestrationProfileDto: RegistrationProfileUserDto ){
		return  this.profileService.registration(regestrationProfileDto)
	}

	@ApiOperation({summary: 'Изменение профиля'})
  @ApiResponse({status: 201, type:Profiles})
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Put('/change')
	change(@Body()dto:RegistrationProfileUserDto){
		return  this.profileService.changeProfile(dto)                       
	}

}