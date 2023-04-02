import {ApiProperty} from "@nestjs/swagger";
import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";

import { Users } from "src/users/users.model";
import { UserRoles } from "./users-roles.model";


interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles', createdAt:false, updatedAt:false})
export class Roles extends Model<Roles, RoleCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли '})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Описание роли администратора', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => Users, () => UserRoles)
    users: Users[];
}