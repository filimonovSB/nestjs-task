import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service'
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
	constructor(
		private rolesService:RolesService
	){}
	
	@ApiOperation({summary: 'Создать роль'})
  @ApiResponse({status: 201, type:Roles})
	@Post()
	createRole(@Body() dto:CreateRoleDto){
		return this.rolesService.createRole(dto)
	}

	@ApiOperation({summary: 'Получить роль по значению'})
  @ApiResponse({status: 200, type:Roles})
	@Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

}
