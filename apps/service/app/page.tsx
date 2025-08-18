'use client';

import { ExternalLink } from 'lucide-react';
import { JetBrains_Mono } from 'next/font/google';
import { memo, useCallback, useEffect, useReducer } from 'react';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetBrainsMono',
});

const ANIMATION_DELAYS = {
  INITIAL_SLIDE: 300,
  TYPING_START: 800,
  CHAR_INTERVAL: 150,
  CURSOR_FADE: 500,
  DETAILS_SHOW: 800,
} as const;

const GREETING_TEXT = "I'm Sam" as const;

type AnimationState = {
  displayedText: string;
  showCursor: boolean;
  showDetails: boolean;
  showText: boolean;
};

type AnimationAction =
  | { type: 'SHOW_TEXT' }
  | { type: 'UPDATE_TEXT'; text: string }
  | { type: 'HIDE_CURSOR' }
  | { type: 'SHOW_DETAILS' };

const initialState: AnimationState = {
  displayedText: '',
  showCursor: true,
  showDetails: false,
  showText: false,
};

function animationReducer(
  state: AnimationState,
  action: AnimationAction
): AnimationState {
  switch (action.type) {
    case 'SHOW_TEXT':
      return { ...state, showText: true };
    case 'UPDATE_TEXT':
      return { ...state, displayedText: action.text };
    case 'HIDE_CURSOR':
      return { ...state, showCursor: false };
    case 'SHOW_DETAILS':
      return { ...state, showDetails: true };
    default:
      return state;
  }
}

function useTypingAnimation() {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let charIndex = 0;

    timeouts.push(
      setTimeout(() => {
        dispatch({ type: 'SHOW_TEXT' });
      }, ANIMATION_DELAYS.INITIAL_SLIDE)
    );

    const startTyping = () => {
      const typeNextChar = () => {
        if (charIndex <= GREETING_TEXT.length) {
          dispatch({
            type: 'UPDATE_TEXT',
            text: GREETING_TEXT.slice(0, charIndex),
          });
          charIndex++;
          timeouts.push(
            setTimeout(typeNextChar, ANIMATION_DELAYS.CHAR_INTERVAL)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              dispatch({ type: 'HIDE_CURSOR' });
            }, ANIMATION_DELAYS.CURSOR_FADE)
          );

          timeouts.push(
            setTimeout(() => {
              dispatch({ type: 'SHOW_DETAILS' });
            }, ANIMATION_DELAYS.DETAILS_SHOW)
          );
        }
      };
      typeNextChar();
    };

    timeouts.push(setTimeout(startTyping, ANIMATION_DELAYS.TYPING_START));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return state;
}

const GitHubLink = memo(function GitHubLink() {
  const handleClick = useCallback(() => {
    window.open(
      'https://github.com/safethecode',
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-neutral-300"
      aria-label="Visit GitHub profile"
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      <span className={`text-sm ${jetBrainsMono.className}`}>GitHub</span>
    </button>
  );
});

const DetailsSection = memo(function DetailsSection({
  isVisible,
}: {
  isVisible: boolean;
}) {
  if (!isVisible) {
    return null;
  }

  return (
    <section className="flex gap-2" aria-label="Additional information">
      <span className={`text-neutral-900 text-sm ${jetBrainsMono.className}`}>
        More details
      </span>
      <GitHubLink />
    </section>
  );
});

export default function Home() {
  const { displayedText, showCursor, showDetails, showText } =
    useTypingAnimation();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <main
        className={`transform text-center transition-all duration-800 ease-out ${
          showDetails ? '-translate-y-8' : 'translate-y-0'
        }`}
        aria-live="polite"
      >
        <h1
          className={`text-neutral-500 ${jetBrainsMono.className} transform transition-all duration-800 ease-out ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {displayedText}
          <span
            className={`text-neutral-400 transition-opacity duration-500 ${
              showCursor ? 'animate-pulse opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            |
          </span>
        </h1>

        <div
          className={`mt-3 transform transition-all duration-800 ease-out ${
            showDetails
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <DetailsSection isVisible={showDetails} />
        </div>
      </main>
    </div>
  );
}
