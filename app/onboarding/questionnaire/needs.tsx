import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const NEEDS_OPTIONS = [
    "Organize My Day and Time",
    "Remember My Tasks",
    "Prioritize To-Do's",
    "Build and Stick to Routines",
    "Support Focus Work",
];

export default function OnboardingNeedsScreen() {
    const router = useRouter();
    const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Header Section */}
                <View className="mb-10 gap-4">
                    <Text className="text-3xl font-serif text-[#1C1C1E] leading-tight">
                        What’s your biggest need right now?
                    </Text>
                    <Text className="text-base text-gray-600 leading-6">
                        To give you the best start, we’d love to know what you most need help with in your daily life.
                    </Text>
                </View>

                {/* Options List */}
                <View className="gap-4">
                    {NEEDS_OPTIONS.map((option) => {
                        const isSelected = selectedNeed === option;

                        return (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setSelectedNeed(option)}
                                activeOpacity={0.8}
                                className={`
                                    w-full py-4 px-6 rounded-full border-2 items-center justify-center
                                    ${isSelected ? 'border-[#1C1C1E] bg-white' : 'border-[#E5E5E5] bg-transparent'}
                                `}
                            >
                                <Text className="text-base font-bold text-[#1C1C1E] text-center">
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity className="mt-8 items-center py-2" onPress={() => console.log('Something else')}>
                    <Text className="text-base font-bold text-[#1C1C1E]">Something else</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Footer Button */}
            <View className="pb-2">
                <TouchableOpacity
                    disabled={!selectedNeed}
                    onPress={() => router.push('/onboarding/questionnaire/neurodivergent')}
                    className={`
                        w-full py-4 rounded-full items-center justify-center
                        ${selectedNeed ? 'bg-[#1C1C1E]' : 'bg-transparent'} 
                    `}
                >
                    {selectedNeed && (
                        <Text className="text-white text-base font-bold">Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}