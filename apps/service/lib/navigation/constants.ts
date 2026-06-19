import {
  FolderOpen,
  type LucideIcon,
  PenTool,
  Trophy,
  User,
} from "lucide-react";

export interface NavigationItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const landingNavigationItems: NavigationItem[] = [
  {
    label: "소개",
    href: "/greetings",
    icon: User,
  },
  {
    label: "참여 프로젝트",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    label: "블로그",
    href: "/blogs",
    icon: PenTool,
  },
  {
    label: "도전과제",
    href: "/achievement",
    icon: Trophy,
  },
];
