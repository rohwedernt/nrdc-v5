import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { ClimbingBoxLoader } from 'react-spinners';
import styles from './Spinner.module.scss';

interface SpinnerProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    color?: string;
    speed?: 'slow' | 'normal' | 'fast';
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

const sizeMap = {
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48
};

const speedMap = {
    slow: 0.8,
    normal: 1.2,
    fast: 1.5
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
    size = 'm',
    color = '#dcdcdc',
    speed = 'normal',
    className,
    style,
    ariaLabel = 'Loading'
}, ref) => {
    return (
        <div
            ref={ref}
            className={classNames(styles.bounding, styles[size], styles[speed], className)}
            style={style}
            role="status"
            aria-label={ariaLabel}>
            <ClimbingBoxLoader
                color={color}
                size={sizeMap[size]}
                speedMultiplier={speedMap[speed]}
            />
        </div>
    );
});

Spinner.displayName = 'Spinner';

export { Spinner };