import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';


@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users) private usersModel : typeof Users,
		private roleService: RolesService
	){}

	async createUser(createUserDto: CreateUserDto){

		const user = await this.usersModel.create(createUserDto)
		const role = await this.roleService.getRoleByValue("ADMIN")
    await user.$set('roles', [role.id])
    user.roles = [role]
		return user 
	}

	async getAllUsers(){
		const users = await this.usersModel.findAll({include:{all:true}})
		return users 
	}

	async getUserByEmail(email:string){
		const user = await this.usersModel.findOne({where:{email}, include:{all:true}})
		return user
	}
 
	 async addRole(dto: AddRoleDto) {
        const user = await this.usersModel.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
