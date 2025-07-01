import { Db, ObjectId } from "mongodb";
import {
  NewsArticle,
  NewsArticleWithId,
  CreateNewsRequest,
  UpdateNewsRequest,
  NewsFilters,
} from "../models";

export class NewsService {
  private db: Db;
  private collection = "news";

  constructor(database: Db) {
    this.db = database;
  }

  async createNews(newsData: CreateNewsRequest): Promise<NewsArticleWithId> {
    const newsArticle: NewsArticle = {
      title: newsData.title,
      content: newsData.content.trim(),
      author: newsData.author?.trim() || "Anonimo",
      category: newsData.category?.trim() || "General",
      tags: newsData.tags || [],
      slug: "slug",
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    };

    const result = await this.db
      .collection(this.collection)
      .insertOne(newsArticle);

    return {
      _id: result.insertedId,
      ...newsArticle,
    };
  }

  async getAllNews(
    filters: NewsFilters = {}
  ): Promise<{ news: NewsArticleWithId[]; total: number }> {
    const { limit = 10, skip = 0, ...filterOptions } = filters;

    const mongoFilter: any = {};

    if (filterOptions.category) {
      mongoFilter.category = filterOptions.category;
    }

    if (filterOptions.author) {
      mongoFilter.author = RegExp(filterOptions.author, "i");
    }

    if (filterOptions.published !== undefined) {
      mongoFilter.published = filterOptions.published;
    }

    if (filterOptions.search) {
      mongoFilter.$or = [
        { title: new RegExp(filterOptions.search, "i") },
        { content: new RegExp(filterOptions.search, "i") },
      ];
    }

    const [news, total] = await Promise.all([
      this.db
        .collection(this.collection)
        .find(mongoFilter)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip(Number(skip))
        .toArray() as Promise<NewsArticleWithId[]>,

      this.db.collection(this.collection).countDocuments(mongoFilter),
    ]);

    return { news, total };
  }

  async getNewsById(id: string): Promise<NewsArticleWithId | null> {
    try {
      if (!ObjectId.isValid(id)) {
        return null;
      }
      const article = (await this.db.collection(this.collection).findOne({
        _id: new ObjectId(id),
      })) as NewsArticleWithId;
      return article;
    } catch (error) {
      throw error;
    }
  }
}
