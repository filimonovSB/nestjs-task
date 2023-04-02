import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table,ForeignKey, BelongsToMany, HasOne } from "sequelize-typescript";
import { Profiles } from "src/profiles/profiles.model";
import { Roles } from "src/roles/roles.model";
import { UserRoles } from "src/roles/users-roles.model";

@Table({tableName:'user', createdAt:false, updatedAt:false})
export class Users extends Model<Users>{
	@ApiProperty({example: '1', description: 'Уникальный идентификатор'})
	@Column({type:DataType.INTEGER, primaryKey:true, autoIncrement:true})
	id:number 

	@ApiProperty({example: 'user@mail.ru', description: 'почта'})
	@Column({type:DataType.STRING, unique:true, allowNull:false})
	email:string 

	@ApiProperty({example: '12345678', description: 'пароль'})
	@Column({type:DataType.STRING, allowNull:false})
	password:string 

	@HasOne( () => Profiles)
	user: Users

	@BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}