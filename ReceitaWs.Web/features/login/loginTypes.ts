export type User = {
    id: string;
    username: string;
    role: string;
  };
  
  export type LoginRequest = {
    username: string;
    password: string;
  };
  
  export type LoginResponse = {
    token: string;
    user: User;
  };  