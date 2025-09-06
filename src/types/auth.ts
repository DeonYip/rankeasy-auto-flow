export type UserRole = 'user' | 'operator' | 'prompt_manager' | 'super_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  tokenBalance: number;
  status: 'active' | 'inactive' | 'disabled';
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}