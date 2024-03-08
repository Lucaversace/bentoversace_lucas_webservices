import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project, ProjectDocument } from '../schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectsModel(createProjectDto);
    return project.save();
  }

  findAll() {
    return this.projectsModel.find().exec();
  }

  async findOne(id: string) {
    return this.projectsModel.findOne({ _id: id });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsModel.findByIdAndUpdate(
      { _id: id },
      updateProjectDto,
    );
    project.save();
  }

  async remove(id: string) {
    return await this.projectsModel.findByIdAndDelete(id);
  }
}
