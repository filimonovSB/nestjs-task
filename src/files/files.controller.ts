import { Controller, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
	constructor(
		private filesServoce: FilesService
	){}

	@ApiOperation({summary: 'Удаление фалов, которыt были созданы больше 1 часа назад'})
  @ApiResponse({status: 200})
	@Delete('/old')
	deleteOldFiles(){
		return this.filesServoce.deleteOldFiles()
	}

	@ApiOperation({summary: 'Удаление неиспользованных файлов'})
  @ApiResponse({status: 200})
	@Delete('/unused')
	deleteUnusedFiles(){
		return this.filesServoce.deleteUnusedFiles()
	}

}
