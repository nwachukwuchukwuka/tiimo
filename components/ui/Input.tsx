import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    placeholder: string;
}

export const Input = ({ placeholder, ...props }: InputProps) => {
    return (
        <View className="w-full">
            <TextInput
                className="w-full bg-[#F2F2F7] rounded-xl py-4 px-5 text-base text-[#1C1C1E] placeholder:text-gray-400"
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                {...props}
            />
        </View>
    );
};