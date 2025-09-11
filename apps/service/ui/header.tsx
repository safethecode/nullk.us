'use client';

import { landingNavigationItems } from '@/lib/navigation/constants';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isCoffeeChatHover, setIsCoffeeChatHover] = useState(false);
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
            <div
              key={index}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredNavIndex(index)}
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              <Link
                href={item.href}
                className="relative flex items-center overflow-hidden text-center font-medium text-neutral-800! text-xl transition-colors duration-200 hover:text-neutral-900"
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
            </div>
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            href="/join"
            className="flex items-center gap-2 overflow-visible rounded-full bg-primary px-4 py-2 font-medium text-lg text-white! transition-colors duration-200 hover:bg-primary/90"
            onMouseEnter={() => setIsCoffeeChatHover(true)}
            onMouseLeave={() => setIsCoffeeChatHover(false)}
          >
            커피챗 요청
            <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
              <ArrowRight
                className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isCoffeeChatHover ? 'translate-x-10' : 'translate-x-0'}`}
              />
              <ArrowRight
                className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isCoffeeChatHover ? 'translate-x-0' : '-translate-x-10'}`}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
