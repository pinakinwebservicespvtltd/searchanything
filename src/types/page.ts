export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreatePageInput = Omit<CustomPage, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePageInput = Partial<Omit<CustomPage, 'id'>>;