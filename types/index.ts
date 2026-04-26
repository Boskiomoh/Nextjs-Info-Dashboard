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

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  tag_list: string[];
  reading_time_minutes: number;
  published_at: string;
  body_markdown?: string;
  user?: {
    name: string;
  };
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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
