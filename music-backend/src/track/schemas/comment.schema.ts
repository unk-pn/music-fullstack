import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;

  @Prop()
  username: string;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
