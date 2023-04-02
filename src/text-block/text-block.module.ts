import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common';

import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { FilesModule } from 'src/files/files.module';
import { TextBlock } from './text-block.model';
import { Groups } from './group.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports:[
		FilesModule,
		SequelizeModule.forFeature([TextBlock, Groups]),
		AuthModule
	],
  controllers: [TextBlockController],
  providers: [TextBlockService]
})
export class TextBlockModule {}
