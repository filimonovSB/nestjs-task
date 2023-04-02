import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({tableName: 'file', updatedAt:false})
export class Files extends Model<Files> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

		@ApiProperty({example: 'png', description: 'Тип файла'})
		@Column({type: DataType.STRING, allowNull:false})
		type: string
    
    @ApiProperty({example: 'cat', description: 'Название файла'})
    @Column({type: DataType.STRING, allowNull: false, unique:true})
    name: string

		@ApiProperty({example: 'text_block', description: 'Название таблицы в которой используется файл'})
		@Column({ type: DataType.STRING })
		essenceTable: string

		@ApiProperty({example: '1', description: 'id сущности в которой используется файл'})
		@Column({ type: DataType.INTEGER })
		essenceId: number

}





