import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

import { TextBlock } from "./text-block.model";

@Table({tableName:"group",createdAt:false, updatedAt:false})
export class Groups extends Model<Groups>{
	@ApiProperty({example: '1', description: 'Уникальный идентификатор'})
	@Column({type:DataType.INTEGER, primaryKey:true, autoIncrement:true})
	id:number

	@ApiProperty({example: 'ADMIN', description: 'Роль'})
	@Column({type:DataType.STRING, unique:true, allowNull:false})
	title:string 
		
	@HasOne( () => TextBlock)
	textBlock: TextBlock
}