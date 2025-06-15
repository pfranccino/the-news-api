export interface UpdateNewsRequest {
    title?: string;
    content?: string;
    author?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
  }