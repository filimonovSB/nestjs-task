import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common';

import { Roles } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Roles) private RolesModel: typeof Roles
	){}

		async createRole(dto:CreateRoleDto){
			const role = await this.RolesModel.create(dto)
			return role 
		}
  	async getRoleByValue(value: string) {
      const role = await this.RolesModel.findOne({where: {value}})
      return role;
    }
}
