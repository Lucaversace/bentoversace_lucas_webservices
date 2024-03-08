import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Skill } from './skill.schema';
import { User } from './user.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' })
  skillsRequired: Skill[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  members: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
