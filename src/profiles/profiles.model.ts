import { ApiProperty } from '@nestjs/swagger';

import { Users } from './../users/users.model'
import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";

@Table({tableName:'profile', createdAt:false, updatedAt:false})
export class Profiles extends Model<Profiles>{
	@ApiProperty({example: '1', description: 'Уникальный идентификатор'})
	@Column({type:DataType.INTEGER, primaryKey:true, autoIncrement:true})
	id:number 

	@ApiProperty({example: 'Джон', description: 'Имя'})
	@Column({type:DataType.STRING, allowNull:false})
	fistName:string 

	@ApiProperty({example: 'Сина', description: 'Фамилия'})
	@Column({type:DataType.STRING, allowNull:false})
	lastName:string 

	@ApiProperty({example: '+79005034141', description: 'номер телефона'})
	@Column({type:DataType.STRING, allowNull:false})
	telephone:string

	@ApiProperty({example: 'Кемерово пр. Кирова 1', description: 'адрес'})
	@Column({type:DataType.STRING, allowNull:false})
	adress:string

	@ForeignKey(() => Users)
	userId: number 
	

}