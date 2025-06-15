export interface AuthResponse {
    success: boolean;
    data?: {
      user: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
      };
      token: string;
      expiresIn: string;
    };
    error?: string;
    message?: string;
  }