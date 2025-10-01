'use client';

import { landingNavigationItems } from '@/lib/navigation/constants';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatedActionButton } from './animated-action-button';

export function Header() {
  const [isLogoLeftHover, setIsLogoLeftHover] = useState(false);
  const [isLogoRightHover, setIsLogoRightHover] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="메뉴 닫기"
        />
      )}

      <header className="relative z-50 mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <div
            className={`flex-shrink-0 transition-transform duration-300 ${isLogoLeftHover ? '-rotate-12' : ''} ${isLogoRightHover ? 'rotate-12' : ''}`}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/sam-son/sam-logo.svg"
                alt="삼손 로고"
                width={38}
                height={23}
                onMouseEnter={() => setIsLogoLeftHover(true)}
                onMouseLeave={() => setIsLogoLeftHover(false)}
              />
              <Image
                src="/assets/logos/sam-son/son-logo.svg"
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
                <div className="relative ml-1 h-5 w-5 overflow-hidden rounded-lg bg-white">
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
            <AnimatedActionButton href="/coffee-chat">
              커피챗 요청
            </AnimatedActionButton>
          </div>
          <button
            type="button"
            className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <div
          className={`absolute top-full right-0 left-0 bg-white transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 pointer-events-none opacity-0'
          }`}
        >
          <div className="border-gray-100 border-t shadow-lg">
            <nav className="flex flex-col space-y-4 py-4">
              {landingNavigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-800 text-lg transition-colors hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <AnimatedActionButton
                  href="/coffee-chat"
                  className="w-full justify-center"
                >
                  커피챗 요청
                </AnimatedActionButton>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
