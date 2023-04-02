import { ApiProperty } from "@nestjs/swagger"

export class CreateTextBlockDto{
	@ApiProperty({example: 'main', description: 'Уникально название'})
	readonly uniq_title:string

	@ApiProperty({example: 'Главный пост', description: 'название'})
	readonly title:string

	@ApiProperty({example: 'Какой-то текст', description: 'текст'})
	readonly text:string

	@ApiProperty({example: 'post', description: 'группа'})
	readonly group:string
}