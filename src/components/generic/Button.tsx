'use client';

import React, { ReactNode, forwardRef } from 'react';
import Link from 'next/link';

import { Spinner, Icon } from '.';
import styles from './Button.module.scss';
import { ShadowSize } from '../types';

interface CommonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'accent';
    size?: 's' | 'm' | 'l';
    strong?: boolean;
    label?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    loading?: boolean;
    fillWidth?: boolean;
    shadow?: ShadowSize;
    children?: ReactNode;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
}

export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(({
    variant = 'primary',
    size = 'm',
    strong = true,
    label,
    children,
    prefixIcon,
    suffixIcon,
    loading = false,
    fillWidth = false,
    shadow,
    href,
    className,
    style,
    ...props
}, ref) => {
    const labelSize = size === 'l' ? 'font-l' : size === 'm' ? 'font-m' : 'font-s';
    const iconSize = size === 'l' ? 'm' : size === 'm' ? 's' : 'xs';

    const content = (
        <>
            {prefixIcon && !loading && <Icon name={prefixIcon} size={iconSize} />}
            {loading && <Spinner size={size} />}
            <div className={`font-label ${strong ? 'font-strong' : ''} ${styles.label} ${labelSize}`}>{label || children}</div>
            {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
        </>
    );

    const commonProps = {
        className: `${styles.button} ${styles[variant]} ${styles[size]} ${fillWidth ? styles.fillWidth : styles.fitContent} ${className || ''} ${shadow && `shadow-${shadow}`}`,
        style: { ...style, textDecoration: 'none' },
    };

    if (href) {
        const isExternal = isExternalLink(href);

        if (isExternal) {
            return (
                <a
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...commonProps}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            {...commonProps}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {content}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };