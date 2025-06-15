import { ObjectId } from 'mongodb';

export interface Tag {
  name: string;
  slug: string;
  usage: number;
  createdAt: Date;
}

export interface TagWithId extends Tag {
  _id: ObjectId;
}