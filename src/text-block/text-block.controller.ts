import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlockService } from './text-block.service'
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { TextBlock } from './text-block.model';

@ApiTags('Текстовые блоки')
@Controller('text-block')
export class TextBlockController {
	constructor(
		private textBlockService: TextBlockService
	){}

	@ApiOperation({summary: 'Создание текстового блока'})
  @ApiResponse({status: 200, type: TextBlock})
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	createTextBlock(@Body() dto:CreateTextBlockDto, @UploadedFile() image: Express.Multer.File){
		return this.textBlockService.createTextBlock(dto, image)
	}

	@ApiOperation({summary: 'Обновление текстового блока'})
  @ApiResponse({status: 201, type:TextBlock })
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Put()
	@UseInterceptors(FileInterceptor('image'))
	updateTextBlock(@Body() dto:CreateTextBlockDto, @UploadedFile() image: Express.Multer.File){
		return this.textBlockService.updateTextBlock(dto, image)
	}

	@ApiOperation({summary: 'Получить все текстовые блоки'})
  @ApiResponse({status: 200, type:TextBlock })
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Get()
	getAll(){
		return this.textBlockService.getAllTextBlock()
	}

	@ApiOperation({summary: 'Получить текстовый блок, по уникальному названию'})
  @ApiResponse({status: 200, type:TextBlock })
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Get(':title')
	getByTitle(@Param() title:string){
		return this.textBlockService.getTextBlockByUTitle(title)
	}

	@ApiOperation({summary: 'Удалить текстовый блок, по уникальному названию'})
  @ApiResponse({status: 200, type:TextBlock })
	@Roles("ADMIN")
  @UseGuards(RolesGuard)
	@Delete('/:title')
	deleteTextBlock(@Param('title') title:string){
		console.log('CONTROLLER', title);
		return this.textBlockService.deleteTextBlock(title)
	}

}
