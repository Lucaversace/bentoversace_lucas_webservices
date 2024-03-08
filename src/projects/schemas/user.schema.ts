import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Skill } from './skill.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  role_admin: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' })
  skills: Skill[];

  async validatePassword(
    this: UserDocument,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});
