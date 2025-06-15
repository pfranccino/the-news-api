export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'admin' | 'editor' | 'author';
    avatar?: string;
    bio?: string;
  }