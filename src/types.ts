import { ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: string; // lucide icon name
  image: string;
}

export interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  link?: string;
}

export interface AppContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  services: Service[];
  popups: Popup[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}
