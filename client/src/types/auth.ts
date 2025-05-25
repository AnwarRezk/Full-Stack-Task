export interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  name: string;
  access_token: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  signIn: (data: SignInFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  signOut: () => void;
} 