'use client';

import { JetBrains_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetBrainsMono',
});

export default function Home() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex <= "I'm Sam".length) {
        setDisplayedText("I'm Sam".slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeNextChar, 150);
      } else {
        timeoutId = setTimeout(() => setShowCursor(false), 3000);
      }
    };

    typeNextChar();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <p className={`text-neutral-500 ${jetBrainsMono.className}`}>
        {displayedText}
        {showCursor && (
          <span className="animate-pulse text-neutral-400">|</span>
        )}
      </p>
    </div>
  );
}
