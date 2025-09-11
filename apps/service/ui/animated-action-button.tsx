'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

interface AnimatedActionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function AnimatedActionButton({
  href,
  children,
  className = '',
  icon: Icon = ArrowRight,
}: AnimatedActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 overflow-visible rounded-full bg-primary px-4 py-2 font-medium text-lg text-white! transition-colors duration-200 hover:bg-primary/90 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
        <Icon
          className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-10' : 'translate-x-0'}`}
        />
        <Icon
          className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-10'}`}
        />
      </div>
    </Link>
  );
}
