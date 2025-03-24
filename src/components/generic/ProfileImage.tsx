'use client';

import React, { forwardRef } from 'react';
import { Flex, SmartImage } from '.';
import styles from './ProfileImage.module.scss';

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
            style={{
                ...style,
                width: '160px',
                height: '40vh'
            }}
            className={`${styles.profileImage} ${className || ''}`}>
            <SmartImage
                radius="s"
                src={src}
                fill
                alt="Profile"
                sizes="160px"
                className={styles.image}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </Flex>
    );
});

ProfileImage.displayName = 'ProfileImage';

export { ProfileImage };
export type { ProfileImageProps }; 