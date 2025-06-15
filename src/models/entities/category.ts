import { ObjectId } from 'mongodb';

export interface Category {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithId extends Category {
  _id: ObjectId;
}