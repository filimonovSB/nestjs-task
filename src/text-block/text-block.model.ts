import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { Groups } from "./group.model";


interface CretionTextBlcok{
    id: number;
    uniq_title: string;
    title: string;		
    image: string;
    text: string;
    groupId: number;
}

@Table({tableName: 'text_block', createdAt:false, updatedAt:false})
export class TextBlock extends Model<TextBlock,CretionTextBlcok > {

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'main', description: 'Уникальное название текстового блока '})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  uniq_title: string;

  @ApiProperty({example: 'Главный блок', description: 'Название текстового блока'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

	@ApiProperty({example: 'Здесь будет текст главного блока', description: 'Текст текстового блока'})
	@Column({type: DataType.STRING, allowNull: false})
  text: string;

  @ForeignKey(()=> Groups)
  groupId: Groups;
}