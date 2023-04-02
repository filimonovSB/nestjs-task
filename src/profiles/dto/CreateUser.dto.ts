import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{
	@ApiProperty({example: 'user@mail.ru', description: 'почта'})
	readonly email: string

	@ApiProperty({example: '12345678', description: 'пароль'})
	readonly password: string
}