import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}