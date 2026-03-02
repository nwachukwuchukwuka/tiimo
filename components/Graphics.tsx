import { COLORS } from '@/constants';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const TiimoLogoIcon = ({ size = 100 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Circle
            cx="50"
            cy="50"
            r="48"
            stroke={COLORS.primary}
            strokeWidth="3"
        />
        <Path
            d="M12 55C12 55 30 85 50 65C70 45 88 55 88 55"
            stroke={COLORS.primary}
            strokeWidth="3"
            strokeLinecap="round"
        />
    </Svg>
);

export const LaurelWreath = ({
    size = 60,
    flipped = false
}: {
    size?: number;
    flipped?: boolean;
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={COLORS.primary}
        style={{ transform: [{ scaleX: flipped ? -1 : 1 }] }}
    >
        <Path d="M12 2C12 2 11 6 8 8C5 10 2 10 2 10C2 10 4 12 7 12C10 12 12 10 12 10V20C12 20 14 18 15 16C16 14 15 11 15 11C15 11 13 13 12 14V2Z" />
        <Path d="M4 16C4 16 6 15 8 16C10 17 11 20 11 20C11 20 9 21 6 21C3 21 2 19 2 19C2 19 3 17 4 16Z" />
        <Path d="M3 13C3 13 5 12 7 13C9 14 10 16 10 16C10 16 8 18 5 18C2 18 1 15 1 15C1 15 2 14 3 13Z" />
    </Svg>
);