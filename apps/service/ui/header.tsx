'use client';

import { landingNavigationItems } from '@/lib/navigation/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatedActionButton } from './animated-action-button';

export function Header() {
  const [isLogoLeftHover, setIsLogoLeftHover] = useState(false);
  const [isLogoRightHover, setIsLogoRightHover] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);

  return (
    <header className="mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex h-24 items-center justify-between">
        <div
          className={`flex-shrink-0 transition-transform duration-300 ${isLogoLeftHover ? '-rotate-12' : ''} ${isLogoRightHover ? 'rotate-12' : ''}`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/sam-logo.svg"
              alt="삼손 로고"
              width={38}
              height={23}
              onMouseEnter={() => setIsLogoLeftHover(true)}
              onMouseLeave={() => setIsLogoLeftHover(false)}
            />
            <Image
              src="/assets/logo/son-logo.svg"
              alt="삼손 로고"
              width={34}
              height={23}
              onMouseEnter={() => setIsLogoRightHover(true)}
              onMouseLeave={() => setIsLogoRightHover(false)}
            />
          </Link>
        </div>
        <nav className="hidden space-x-12 md:flex">
          {landingNavigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="relative flex items-center overflow-hidden text-center font-medium text-neutral-800! text-xl transition-colors duration-200 hover:text-neutral-900"
              onMouseEnter={() => setHoveredNavIndex(index)}
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              {item.label}
              <div className="relative ml-1 h-5 w-5 overflow-hidden rounded-full bg-white">
                <item.icon
                  className={`absolute h-5 w-5 transition-transform duration-300 ease-out ${
                    hoveredNavIndex === index
                      ? 'translate-x-0'
                      : '-translate-x-6'
                  }`}
                />
              </div>
            </Link>
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">
          <AnimatedActionButton href="/join">커피챗 요청</AnimatedActionButton>
        </div>
      </div>
    </header>
  );
}
