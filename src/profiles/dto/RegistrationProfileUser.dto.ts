import { ApiProperty } from "@nestjs/swagger"

export class RegistrationProfileUserDto{
	@ApiProperty({example: 'user@mail.ru', description: 'Почта'})
	readonly email: string

	@ApiProperty({example: '12345678', description: 'Пароль'})
	readonly password: string

	@ApiProperty({example: 'Джон', description: 'Имя'})
	readonly fistName: string

	@ApiProperty({example: 'Сина', description: 'Имя'})
	readonly lastName: string

	@ApiProperty({example: '+79235004444', description: 'Телефон'})
	readonly telephone: string

	@ApiProperty({example: 'Кемерово пр.Кирова 1', description: 'Адрес'})
	readonly adress: string
}