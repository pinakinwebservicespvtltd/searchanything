import { CustomPage, CreatePageInput, UpdatePageInput } from '@/types/page';

const PAGES_STORAGE_KEY = 'custom_pages';

export function getPages(): CustomPage[] {
  const stored = localStorage.getItem(PAGES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function createPage(input: CreatePageInput): CustomPage {
  const pages = getPages();
  const newPage: CustomPage = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  pages.push(newPage);
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  return newPage;
}

export function updatePage(id: string, input: UpdatePageInput): CustomPage | null {
  const pages = getPages();
  const index = pages.findIndex(page => page.id === id);
  
  if (index === -1) return null;
  
  const updatedPage = {
    ...pages[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  
  pages[index] = updatedPage;
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  return updatedPage;
}

export function deletePage(id: string): boolean {
  const pages = getPages();
  const filtered = pages.filter(page => page.id !== id);
  
  if (filtered.length === pages.length) return false;
  
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}