import { ObjectId } from 'mongodb';

export interface Comment {
  newsId: ObjectId;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentWithId extends Comment {
  _id: ObjectId;
}