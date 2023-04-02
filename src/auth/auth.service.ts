import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

import { Users } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	){}

	async registration(dto:any){
		const candidate = await this.usersService.getUserByEmail(dto.email)
		if(candidate){
			throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
		}

		const hashPassword =await bcrypt.hash(dto.password, 3)  
		const user = await this.usersService.createUser({...dto, password:hashPassword})
		const token = this.generateToken(user)

		return {token,user}
	}

   async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

	private generateToken(user:Users){
		const payload ={email:user.email, id:user.id, roles:user.roles}
		return{
			token: this.jwtService.sign(payload)
		}
	}

	private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
