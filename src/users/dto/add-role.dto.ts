import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Значени роли'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'Id пользователя'})
    readonly userId: number;
}
