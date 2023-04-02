import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from'path'
import * as fs from'fs'
import * as uuid from 'uuid'
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Files } from './files.model';


@Injectable()
export class FilesService {

	constructor(
		@InjectModel(Files) private fileModel: typeof Files
	){}

	async createFile(file: Express.Multer.File, essenceTable:string, essenceId:number):Promise<string>{
		try {
			const fileName = this.generateFileName(file.mimetype)

			const filePath = path.resolve(__dirname, '..','static')

			if(!fs.existsSync(filePath)){
				fs.mkdirSync(filePath,{recursive:true})
			}

			fs.writeFileSync(path.join(filePath,fileName), file.buffer)

			await this.fileModel.create({name:fileName, essenceTable, essenceId, type:file.mimetype})

			return fileName

		} catch (error) {
			throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
	
	async updateEssncedId(fileName:string, id:number){
		const file = await this.fileModel.findOne( { where: {name:fileName} } )
		await file.update({essenceId:id})
		await file.save		
	}

	async deleteOldFiles(){
 		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const unusedFiles = await this.fileModel.findAll({
      where: {
        createdAt: { [Op.lt]: oneHourAgo },
      }})
		
		unusedFiles.forEach(async (file) => {
      fs.unlinkSync(path.join(__dirname, '..', 'static', '/' ,file.name));
      await file.destroy();
    });
		

		return unusedFiles
		
	}
	
	async deleteUnusedFiles(){
		const unusedFiles = await this.fileModel.findAll({
      where: {
        essenceTable: null,
        essenceId: null,
			
      }})
		
		unusedFiles.forEach(async (file) => {
      fs.unlinkSync(path.join(__dirname, '..', 'static', '/' ,file.name));
      await file.destroy();
    });

		return unusedFiles
	}
	

	private generateFileName(mimetype:string){
		//file.mimetype="image/png"
		const extension =  mimetype.split('/')[1]
		const fileName = uuid.v4() + '.' + extension
		
		return fileName
	}

}

