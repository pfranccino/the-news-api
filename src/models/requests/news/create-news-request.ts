export interface CreateNewsRequest {
    title: string;
    content: string;
    author?: string;
    category?: string;
    tags?: string[];
  }