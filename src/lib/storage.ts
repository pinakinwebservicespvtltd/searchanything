import { SiteSettings, AdminCredentials, SearchEngineSettings, ContactSettings } from '@/types/settings';

const SETTINGS_KEY = 'site_settings';
const ADMIN_CREDENTIALS_KEY = 'admin_credentials';
const SEARCH_ENGINE_KEY = 'search_engine_settings';
const CONTACT_SETTINGS_KEY = 'contact_settings';

const defaultSettings: SiteSettings = {
  siteName: 'Search Engine',
  seoTitle: 'Modern Search Engine',
  seoDescription: 'Fast, reliable, and privacy-focused search engine',
  seoKeywords: 'search, engine, fast, reliable',
  favicon: '/favicon.ico',
  logo: {
    type: 'text',
    content: 'Search Engine'
  }
};

const defaultCredentials: AdminCredentials = {
  username: 'admin',
  password: 'admin'
};

const defaultSearchEngine: SearchEngineSettings = {
  apiKey: '',
  searchEngineId: '',
  resultsPerPage: 10
};

const defaultContactSettings: ContactSettings = {
  email: 'support@searchengine.com',
  phone: '+1 (555) 123-4567',
  address: '123 Search Street, Tech City, TC 12345',
  supportHours: {
    days: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM EST'
  },
  socialMedia: {}
};

export function getSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getCredentials(): AdminCredentials {
  try {
    const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    return stored ? JSON.parse(stored) : defaultCredentials;
  } catch {
    return defaultCredentials;
  }
}

export function saveCredentials(credentials: AdminCredentials): void {
  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
}

export function getSearchEngineSettings(): SearchEngineSettings {
  try {
    const stored = localStorage.getItem(SEARCH_ENGINE_KEY);
    return stored ? JSON.parse(stored) : defaultSearchEngine;
  } catch {
    return defaultSearchEngine;
  }
}

export function saveSearchEngineSettings(settings: SearchEngineSettings): void {
  localStorage.setItem(SEARCH_ENGINE_KEY, JSON.stringify(settings));
}

export function getContactSettings(): ContactSettings {
  try {
    const stored = localStorage.getItem(CONTACT_SETTINGS_KEY);
    return stored ? JSON.parse(stored) : defaultContactSettings;
  } catch {
    return defaultContactSettings;
  }
}

export function saveContactSettings(settings: ContactSettings): void {
  localStorage.setItem(CONTACT_SETTINGS_KEY, JSON.stringify(settings));
}