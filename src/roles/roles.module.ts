import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';
import { UserRoles } from './users-roles.model';

@Module({
	imports:[ SequelizeModule.forFeature([Roles, UserRoles])],
  providers: [RolesService],
  controllers: [RolesController],
	exports:[RolesService]
})
export class RolesModule {}
