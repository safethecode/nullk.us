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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="메뉴 닫기"
        />
      )}

      <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[52rem] items-center justify-between px-6 sm:px-8">
          <div
            className={`flex-shrink-0 transition-transform duration-300 ${isLogoLeftHover ? '-rotate-12' : ''} ${isLogoRightHover ? 'rotate-12' : ''}`}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/sam-son/sam-logo.svg"
                alt="삼손 로고"
                width={32}
                height={20}
                onMouseEnter={() => setIsLogoLeftHover(true)}
                onMouseLeave={() => setIsLogoLeftHover(false)}
              />
              <Image
                src="/assets/logos/sam-son/son-logo.svg"
                alt="삼손 로고"
                width={28}
                height={20}
                onMouseEnter={() => setIsLogoRightHover(true)}
                onMouseLeave={() => setIsLogoRightHover(false)}
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {landingNavigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-[13px] font-medium text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}
            <AnimatedActionButton href="/coffee-chat">
              커피챗
            </AnimatedActionButton>
          </nav>

          <button
            type="button"
            className="flex items-center justify-center rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`absolute top-full right-0 left-0 bg-white transition-all duration-200 ease-out md:hidden ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-2 pointer-events-none opacity-0'
          }`}
        >
          <div className="border-t border-neutral-100 shadow-sm">
            <nav className="mx-auto flex max-w-[52rem] flex-col gap-1 px-6 py-3 sm:px-8">
              {landingNavigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[14px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 text-neutral-400" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <AnimatedActionButton
                  href="/coffee-chat"
                  className="w-full justify-center"
                >
                  커피챗
                </AnimatedActionButton>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
