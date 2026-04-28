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
export interface SessionState {
  currentView: string;
  lastSearch: string;
  isPrivacyMode: boolean;
  setCurrentView: (view: string) => void;
  setLastSearch: (query: string) => void;
  togglePrivacyMode: () => void;
  clearSession: () => void;
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
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  initialized: boolean; // To track if we've checked the session already
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
export interface BlogPost {
  title: string;
  content: string;
  date: string;
}

export type PostsData = Record<string, BlogPost>;

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
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}