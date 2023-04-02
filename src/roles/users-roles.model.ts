import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

import { Roles } from "./roles.model";
import { Users } from "src/users/users.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
	@ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
	
	@ApiProperty({example: '2', description: 'id роли'})
  @ForeignKey(() => Roles)
  @Column({type: DataType.INTEGER})
  roleId: number

	@ApiProperty({example: '2', description: 'id пользователя'})
  @ForeignKey(() => Users)
  @Column({type: DataType.INTEGER})
  userId: number;

}