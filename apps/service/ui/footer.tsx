"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { landingNavigationItems } from "@/lib/navigation/constants";
import { GitHubIcon, LinkedInIcon } from "@/ui/social-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-neutral-100 border-t">
      <div className="mx-auto max-w-[52rem] px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 font-semibold text-[14px] text-neutral-900">
              손지민
            </p>
            <p className="max-w-xs text-[13px] text-neutral-400 leading-relaxed">
              귀한 발걸음 감사드립니다.
              <br />
              함께 PMF 를 찾는 그 날을 기대하겠습니다.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/safethecode",
                  icon: GitHubIcon,
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/safethecode",
                  icon: LinkedInIcon,
                },
                { name: "Email", href: "mailto:sam@nullk.us", icon: Mail },
              ].map((social) => (
                <Link
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-neutral-50 hover:text-neutral-600"
                  href={social.href}
                  key={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {landingNavigationItems.map((item) => (
              <Link
                className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-700"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-neutral-50 border-t pt-6">
          <p className="text-[12px] text-neutral-300">
            &copy; {currentYear} 손지민. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
