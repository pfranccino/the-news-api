import { ObjectId } from 'mongodb';

export interface NewsArticle {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export interface NewsArticleWithId extends NewsArticle {
  _id: ObjectId;
}