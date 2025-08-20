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
  showFirstLine: boolean;
  showSecondLine: boolean;
  showThirdLine: boolean;
};

type AnimationAction =
  | { type: 'SHOW_TEXT' }
  | { type: 'UPDATE_TEXT'; text: string }
  | { type: 'HIDE_CURSOR' }
  | { type: 'SHOW_DETAILS' }
  | { type: 'SHOW_FIRST_LINE' }
  | { type: 'SHOW_SECOND_LINE' }
  | { type: 'SHOW_THIRD_LINE' };

const initialState: AnimationState = {
  displayedText: '',
  showCursor: true,
  showDetails: false,
  showText: false,
  showFirstLine: false,
  showSecondLine: false,
  showThirdLine: false,
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
    case 'SHOW_FIRST_LINE':
      return { ...state, showFirstLine: true };
    case 'SHOW_SECOND_LINE':
      return { ...state, showSecondLine: true };
    case 'SHOW_THIRD_LINE':
      return { ...state, showThirdLine: true };
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
              dispatch({ type: 'SHOW_FIRST_LINE' });
            }, ANIMATION_DELAYS.DETAILS_SHOW)
          );

          timeouts.push(
            setTimeout(() => {
              dispatch({ type: 'SHOW_SECOND_LINE' });
            }, ANIMATION_DELAYS.DETAILS_SHOW + 400)
          );

          timeouts.push(
            setTimeout(() => {
              dispatch({ type: 'SHOW_THIRD_LINE' });
            }, ANIMATION_DELAYS.DETAILS_SHOW + 600)
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

const ExternalLinkButton = memo(function ExternalLinkButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: string;
}) {
  const handleClick = useCallback(() => {
    window.open(href, '_blank', 'noopener,noreferrer');
  }, [href]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 text-neutral-800 transition-colors duration-200 hover:text-neutral-300"
      aria-label={label}
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      <span className={`text-sm ${jetBrainsMono.className}`}>{children}</span>
    </button>
  );
});

const WorkedAtLink = memo(function WorkedAtLink({
  href,
  company,
  highlightColor = 'text-blue-600',
}: {
  href?: string;
  company: string;
  highlightColor?: string;
}) {
  const handleClick = useCallback(() => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }, [href]);

  const content = (
    <span className={`text-sm ${jetBrainsMono.className}`}>
      <span className={`${highlightColor} font-medium`}>{company}</span>
    </span>
  );

  if (href) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex cursor-pointer items-center text-neutral-800 transition-colors duration-200 hover:text-neutral-300"
        aria-label={`Visit ${company}`}
      >
        {content}
      </button>
    );
  }

  return <span className="flex items-center text-neutral-800">{content}</span>;
});

const DetailsSection = memo(function DetailsSection({
  isVisible,
  showFirstLine,
  showSecondLine,
  showThirdLine,
}: {
  isVisible: boolean;
  showFirstLine: boolean;
  showSecondLine: boolean;
  showThirdLine: boolean;
}) {
  if (!isVisible) {
    return null;
  }

  return (
    <section
      className="flex flex-col gap-2"
      aria-label="Additional information"
    >
      <div
        className={`flex transform gap-2 transition-all duration-800 ease-out ${
          showFirstLine
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '0ms' }}
      >
        <span className={`text-neutral-700 text-sm ${jetBrainsMono.className}`}>
          More details
        </span>
        <ExternalLinkButton
          href="https://github.com/safethecode"
          label="Visit GitHub profile"
        >
          GitHub
        </ExternalLinkButton>
        <ExternalLinkButton href="https://blog.nullk.us" label="Visit blog">
          Blog
        </ExternalLinkButton>
        <ExternalLinkButton href="https://cv.nullk.us" label="Visit blog">
          CV
        </ExternalLinkButton>
      </div>
      <div
        className={`flex transform items-center gap-2 transition-all duration-800 ease-out ${
          showSecondLine
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '0ms' }}
      >
        <span className={`text-sm ${jetBrainsMono.className} text-neutral-700`}>
          Worked{' '}
        </span>
        <WorkedAtLink
          href="https://sendbird.com"
          company="Sendbird"
          highlightColor="text-[#6210CC]"
        />
        <WorkedAtLink
          href="https://plask.ai"
          company="PlaskAI"
          highlightColor="text-[#1D4FD7]"
        />
        <span
          className={`text-sm ${jetBrainsMono.className} items-center text-neutral-900`}
        >
          ··· More
        </span>
      </div>
      <div
        className={`flex transform items-center gap-2 transition-all duration-800 ease-out ${
          showThirdLine
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '0ms' }}
      >
        <span className={`text-sm ${jetBrainsMono.className} text-neutral-700`}>
          Everyday{' '}
        </span>
        <ExternalLinkButton
          href="https://products.nullk.us"
          label="Visit Product Launch"
        >
          Product Launch
        </ExternalLinkButton>
      </div>
    </section>
  );
});

export default function Home() {
  const {
    displayedText,
    showCursor,
    showDetails,
    showText,
    showFirstLine,
    showSecondLine,
    showThirdLine,
  } = useTypingAnimation();

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
          <DetailsSection
            isVisible={showDetails}
            showFirstLine={showFirstLine}
            showSecondLine={showSecondLine}
            showThirdLine={showThirdLine}
          />
        </div>
      </main>
    </div>
  );
}
