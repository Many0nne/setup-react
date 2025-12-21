export interface User {
  id: string | number;
  email: string;
  name?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}
