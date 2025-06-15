import { ObjectId } from 'mongodb';

export interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  bio?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithId extends User {
  _id: ObjectId;
}

export interface PublicUser {
  _id: ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
}