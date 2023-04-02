import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common';

import { AuthService } from './../auth/auth.service'
import { RegistrationProfileUserDto } from './dto/RegistrationProfileUser.dto'
import { Profiles } from './profiles.model';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ProfilesService {

	constructor(
		@InjectModel(Profiles) private profilesModel : typeof Profiles,
		private authService: AuthService,
		private usersService: UsersService
	){}

	async registration(dto: RegistrationProfileUserDto){
		const UserData = await this.authService.registration({email:dto.email, password:dto.password})
		
		
		const ProfileDto = {
			fistName: dto.fistName,
			lastName: dto.lastName,
			telephone: dto.telephone,
			adress: dto.adress,
			userId: UserData.user.id 
		}
		
		const profile  = await this.profilesModel.create(ProfileDto)
		
		return UserData.token
	}

	async changeProfile(dto:RegistrationProfileUserDto){
		const user = await this.usersService.getUserByEmail(dto.email)
		const profile = await this.profilesModel.findOne({where:{userId:user.id}})
		await profile.update(dto)
		await profile.save()

		return profile 
	}

}
