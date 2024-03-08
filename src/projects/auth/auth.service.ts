import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
