"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { landingNavigationItems } from "@/lib/navigation/constants";
import { AnimatedActionButton } from "./animated-action-button";

export function getHeaderVariant(pathname: string) {
  return pathname === "/" ? "home" : "site";
}

export function SamsonLogo() {
  return (
    <Link aria-label="홈으로" className="flex items-center" href="/">
      <Image
        alt=""
        className="transition-transform duration-300 hover:-rotate-12"
        height={18}
        src="/assets/logos/sam-son/sam-logo.svg"
        width={29}
      />
      <Image
        alt=""
        className="transition-transform duration-300 hover:rotate-12"
        height={18}
        src="/assets/logos/sam-son/son-logo.svg"
        width={25}
      />
    </Link>
  );
}

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-center px-4 sm:px-8">
        <SamsonLogo />
      </div>
    </header>
  );
}

function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {isMobileMenuOpen && (
        <button
          aria-label="메뉴 닫기"
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
        />
      )}

      <header className="sticky top-0 z-50 border-neutral-100 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[52rem] items-center justify-between px-6 sm:px-8">
          <SamsonLogo />

          <nav className="hidden items-center gap-8 md:flex">
            {landingNavigationItems.map((item) => (
              <Link
                className="font-medium text-[13px] text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
            <AnimatedActionButton href="/coffee-chat">
              커피챗
            </AnimatedActionButton>
          </nav>

          <button
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="flex items-center justify-center rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-50 md:hidden"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          aria-hidden={!isMobileMenuOpen}
          className={`absolute top-full right-0 left-0 bg-white transition-all duration-200 ease-out md:hidden ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          inert={!isMobileMenuOpen}
        >
          <div className="border-neutral-100 border-t shadow-sm">
            <nav className="mx-auto flex max-w-[52rem] flex-col gap-1 px-6 py-3 sm:px-8">
              {landingNavigationItems.map((item) => (
                <Link
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-medium text-[14px] text-neutral-600 transition-colors hover:bg-neutral-50"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 text-neutral-400" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <AnimatedActionButton
                  className="w-full justify-center"
                  href="/coffee-chat"
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

export function Header() {
  const pathname = usePathname();

  return getHeaderVariant(pathname) === "home" ? (
    <HomeHeader />
  ) : (
    <SiteHeader />
  );
}
