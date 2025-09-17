'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

interface BaseAnimatedActionButtonProps {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
}

interface LinkAnimatedActionButtonProps extends BaseAnimatedActionButtonProps {
  href: string;
  type?: never;
}

interface ButtonAnimatedActionButtonProps
  extends BaseAnimatedActionButtonProps {
  href?: never;
  type: 'button' | 'submit' | 'reset';
}

type AnimatedActionButtonProps =
  | LinkAnimatedActionButtonProps
  | ButtonAnimatedActionButtonProps;

export function AnimatedActionButton(props: AnimatedActionButtonProps) {
  const { children, icon: Icon = ArrowRight, onClick, className } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const buttonContent = (
    <>
      {children}
      <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
        <Icon
          className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-10' : 'translate-x-0'}`}
        />
        <Icon
          className={`absolute h-5 w-5 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-10'}`}
        />
      </div>
    </>
  );

  const commonProps = {
    className: `cursor-pointer flex items-center gap-2 overflow-visible rounded-full bg-primary px-4 py-2 font-medium text-lg text-white! transition-colors duration-200 hover:bg-primary/90 ${className || ''}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick: handleClick,
  };

  if ('type' in props) {
    return (
      <button type={props.type} {...commonProps}>
        {buttonContent}
      </button>
    );
  }

  if ('href' in props) {
    return (
      <Link href={props.href} {...commonProps}>
        {buttonContent}
      </Link>
    );
  }

  throw new Error('Either href or type must be provided');
}
