import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const skill = new this.usersModel(createUserDto);
    return skill.save();
  }

  findAll() {
    return this.usersModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return await this.usersModel.findOne({ email }).exec();
  }

  async findOne(id: string) {
    return this.usersModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const project = await this.usersModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
    );
    project.save();
  }

  async remove(id: string) {
    return await this.usersModel.findByIdAndDelete(id);
  }
}
