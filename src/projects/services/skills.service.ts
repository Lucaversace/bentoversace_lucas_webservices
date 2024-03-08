import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { UpdateSkillDto } from '../dto/update-skill.dto';
import { Skill, SkillDocument } from '../schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillsModel: Model<SkillDocument>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = new this.skillsModel(createSkillDto);
    return skill.save();
  }

  findAll() {
    return this.skillsModel.find().exec();
  }

  async findOne(id: string) {
    return this.skillsModel.findById(id);
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.skillsModel.findById(id);
    skill.set(updateSkillDto);
    return skill.save();
  }

  async remove(id: string) {
    return await this.skillsModel.findByIdAndDelete(id);
  }
}
