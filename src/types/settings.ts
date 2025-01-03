import { UrlType } from './ads';

export interface SiteSettings {
  siteName: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  favicon: string;
  logo: {
    type: 'text' | 'image';
    content: string;
  };
}

export interface SearchEngineSettings {
  apiKey: string;
  searchEngineId: string;
  resultsPerPage: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  supportHours: {
    days: string;
    hours: string;
  };
  socialMedia: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}