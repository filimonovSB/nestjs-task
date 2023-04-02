import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from './files.model';
import { FilesController } from './files.controller';

@Module({
	imports:[
		SequelizeModule.forFeature([Files])
	],
  providers: [FilesService],
	exports:[FilesService],
	controllers: [FilesController]
})
export class FilesModule {}
