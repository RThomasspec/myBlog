import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { z } from 'zod';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  authorId: Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
