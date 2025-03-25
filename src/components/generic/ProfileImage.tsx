'use client';

import React, { forwardRef } from 'react';
import { Flex } from '.';
import styles from './ProfileImage.module.scss';
import Image from 'next/image';

interface ProfileImageProps {
    src: string;
    style?: React.CSSProperties;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = forwardRef<HTMLDivElement, ProfileImageProps>(({
    src,
    style,
    className
}, ref) => {
    return (
        <Flex
            ref={ref}
            role="img"
            position="relative"
            justifyContent="center"
            alignItems="center"
            radius="s"
            border="neutral-strong"
            borderStyle="solid-1"
            background="surface"
            className={`profile-image ${styles.profileImage} ${className || ''}`}
            style={{
                width: '160px',
                height: '40vh',
                ...style
            }}
        >
            <Image
                src={src}
                alt="Profile"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 200px"
                priority
            />
        </Flex>
    );
});

ProfileImage.displayName = 'ProfileImage';

export { ProfileImage };
export type { ProfileImageProps }; 