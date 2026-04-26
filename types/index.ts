import { ReactNode } from 'react';

export interface User {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Post {
  title: string;
  content: string;
  date: string;
}

export interface PostsData {
  [key: string]: Post;
}

export interface LayoutProps {
  children: ReactNode;
  title?: string;
  hideNav?: boolean;
}

export interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export interface ConceptCardProps {
  title: string;
  description: string;
  code?: string;
  tag?: string;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}
