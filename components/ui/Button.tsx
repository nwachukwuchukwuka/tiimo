import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'apple' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    icon
}: ButtonProps) => {

    let containerStyle = "flex-row items-center justify-center rounded-full py-4 px-6 gap-3";
    let textStyle = "text-base font-semibold";

    switch (variant) {
        case 'primary':
            containerStyle += ` ${disabled ? 'bg-neutral-300' : 'bg-[#1C1C1E]'}`;
            textStyle += " text-white";
            break;
        case 'secondary':
            containerStyle += " bg-[#F2F2F7]";
            textStyle += " text-[#1C1C1E]";
            break;
        case 'apple':
            containerStyle += " bg-white border border-gray-200 shadow-sm";
            textStyle += " text-black";
            break;
        case 'outline':
            containerStyle += " bg-transparent border border-[#E5E5EA]";
            textStyle += " text-[#1C1C1E]";
            break;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled || loading}
            className={containerStyle}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : 'black'} />
            ) : (
                <>
                    {icon && <Ionicons name={icon} size={20} color={variant === 'primary' ? 'white' : 'black'} />}
                    <Text className={textStyle}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};