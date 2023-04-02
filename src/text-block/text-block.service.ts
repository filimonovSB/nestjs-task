import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'

import { Groups } from './group.model'
import { FilesService } from './../files/files.service'
import { TextBlock } from './text-block.model';
import { CreateTextBlockDto } from './dto/create-text-block.dto';

@Injectable()
export class TextBlockService {
	constructor(
		@InjectModel(TextBlock) private TextBlockModel : typeof TextBlock,
		@InjectModel(Groups) private GroupModel : typeof Groups,
		private filesService: FilesService
	){}

	async createTextBlock(dto:CreateTextBlockDto, image:Express.Multer.File){
		const filename = await this.filesService.createFile(image, 'text_block',null)
		const group = await this.createGroup(dto.group)

		const textBlock = await TextBlock.create({...dto,image:filename, groupId:group.id})

		//добавить id для сущности, которой принадлежит файл
		await this.filesService.updateEssncedId(filename, textBlock.id)

		return textBlock
	}

	async getAllTextBlock(){
		const textBlocks = await TextBlock.findAll()
		return textBlocks
	}
	async getTextBlockByUTitle(title:string){
		
		const textBlock = await TextBlock.findOne({where:{ uniq_title :title}})
		return textBlock
	}

	async updateTextBlock(dto:CreateTextBlockDto, image:Express.Multer.File){
		let fileName
		if(image){
		  fileName = await this.filesService.createFile(image,'textBlock',null )
		}
		
		const textBlock = await  this.TextBlockModel.findOne({where:{uniq_title:dto.uniq_title}})
		if (!textBlock){
			throw new HttpException('Такого текстового блока не существует или не указано уникальное имя', HttpStatus.BAD_REQUEST)
		}

		await textBlock.update({ ...dto })
		await textBlock.save()

		if (fileName) {
			await this.filesService.updateEssncedId(fileName, textBlock.id)
		}

		return textBlock
	}

	async createGroup(title:string){
		const group = await this.GroupModel.findOne({where:{title}})

		if(!group){
			return await this.GroupModel.create({title})
		}

		return group
	}

	async deleteTextBlock(title:string){
		const textBlock = await this.TextBlockModel.findOne({where:{uniq_title:title}})

		if (!textBlock) {
			throw new HttpException('Текстового блока с таким уникальным названием не существует', HttpStatus.BAD_REQUEST)
		}

		await  this.TextBlockModel.destroy({where:{uniq_title:title}})

		return {message:`текстовый блок удален ${title}`}
	}

}
