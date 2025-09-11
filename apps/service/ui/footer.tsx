'use client';

import { landingNavigationItems } from '@/lib/navigation/constants';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/safethecode',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/safethecode',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:sam@nullk.us',
      icon: Mail,
    },
  ];

  return (
    <footer className="mx-auto max-w-7xl bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/assets/logo/samson-full-logo.svg"
                alt="삼손 로고"
                width={72}
                height={23}
              />
            </div>
            <p className="mb-6 max-w-md text-lg text-neutral-600 leading-relaxed">
              귀한 발걸음 감사드립니다.
              <br />
              함께 PMF 를 찾는 그 날을 기대하겠습니다 🦁
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 font-semibold text-lg text-neutral-900">
              메뉴
            </h3>
            <nav className="space-y-4">
              {landingNavigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-neutral-600 transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-6 font-semibold text-lg text-neutral-900">
              기타 사항
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-neutral-900 text-sm">위치</p>
                <p className="text-neutral-600">인천, 대한민국</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-neutral-200 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-neutral-500 text-sm">
              © {currentYear} 손지민. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-neutral-500 text-sm">
              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:text-primary"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-primary"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
