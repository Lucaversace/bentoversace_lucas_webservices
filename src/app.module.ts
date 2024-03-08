import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/modules/projects.module';
import { UsersModule } from './projects/modules/users.module';
import { SkillsModule } from './projects/modules/skills.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lbv_web:OoHRBuNnxuxa90B5@cluster0.z1yu0q0.mongodb.net/cowork?retryWrites=true&w=majority',
    ),
    SkillsModule,
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
