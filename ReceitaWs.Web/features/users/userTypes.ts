export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface UpdateUserRequest {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface UserResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  