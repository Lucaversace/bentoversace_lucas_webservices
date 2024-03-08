import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from '../controllers/projects.controller';
import { ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
