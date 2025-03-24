'use client';

import React from 'react';
import Link from 'next/link';
import { useLoading } from './LoadingProvider';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const { setIsLoading } = useLoading();

  const handleClick = () => {
    setIsLoading(true);
    onClick?.();
  };

  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}; 