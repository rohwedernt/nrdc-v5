'use client';

import React from 'react';
import Link from 'next/link';
import { useLoading } from './LoadingProvider';

interface ModuleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export const ModuleLink = ({ href, children, className, onClick, ...props }: ModuleLinkProps) => {
    const { setIsLoading } = useLoading();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setIsLoading(true);
        onClick?.(e);
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    );
}; 