export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
      total: number;
      count: number;
      limit: number;
      skip: number;
      hasMore: boolean;
    };
  }