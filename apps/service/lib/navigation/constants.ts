import {
  Code,
  Earth,
  type LucideIcon,
  Newspaper,
  Shield,
  Target,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const landingNavigationItems: NavigationItem[] = [
  {
    label: '소개',
    href: '/',
    icon: Earth,
  },
  {
    label: '기술과 서비스',
    href: '/products',
    icon: Code,
  },
  {
    label: '약속과 책임',
    href: '/promise',
    icon: Shield,
  },
  {
    label: '소식',
    href: '/news',
    icon: Newspaper,
  },
  {
    label: '도전과제',
    href: '/achievement',
    icon: Target,
  },
];
