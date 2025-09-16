import {
  Calendar,
  FolderOpen,
  type LucideIcon,
  PenTool,
  Trophy,
  User,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const landingNavigationItems: NavigationItem[] = [
  {
    label: '소개',
    href: '/greetings',
    icon: User,
  },
  {
    label: '참여 프로젝트',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    label: '하루 일기',
    href: '/daily-diary',
    icon: Calendar,
  },
  {
    label: '블로그',
    href: '/blogs',
    icon: PenTool,
  },
  {
    label: '도전과제',
    href: '/achievement',
    icon: Trophy,
  },
];
