export interface ProductInput {
  name: string;
  features: string;
  benefits: string;
  keywords: string;
  language: 'vi' | 'en';
  tone: string;
}

export interface ProductDescription {
  id: string;
  title: string;
  content: string;
  html: string;
}
