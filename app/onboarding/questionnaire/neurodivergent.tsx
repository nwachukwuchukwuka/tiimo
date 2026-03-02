import { Button } from '@/components/ui/Button';
import { ONBOARDING_DATA } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingQuiz() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Question */}
                <View className="mb-8">
                    <Text className="text-3xl font-serif text-[#1C1C1E] mb-4">
                        Are you neurodivergent?
                    </Text>
                    <Text className="text-base text-gray-600 leading-6">
                        Tiimo helps you stay focused and plan your day with ease. Which of these feels most like you?
                    </Text>
                </View>

                {/* Options */}
                <View className="gap-4">
                    {ONBOARDING_DATA.neurodivergent.map((option) => {
                        const isSelected = selectedId === option.id;

                        return (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => setSelectedId(option.id)}
                                activeOpacity={0.8}
                                className={`
                                    flex-row items-center justify-between px-6 py-5 rounded-full border 
                                    ${isSelected ? 'border-[#1C1C1E] bg-gray-50' : 'border-gray-200 bg-white'}
                                `}
                            >
                                <Text className={`text-base font-medium ${isSelected ? 'text-black' : 'text-gray-700'}`}>
                                    {option.label}
                                </Text>

                                {isSelected && (
                                    <Ionicons name="checkmark-circle" size={24} color="black" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Footer Action */}
            <View className="pt-4 pb-2">
                {selectedId ? (
                    <Button
                        title="Continue"
                        onPress={() => router.push('/onboarding/paywall')}

                    />
                ) : (
                    <TouchableOpacity className="py-4 items-center"
                        onPress={() => router.push('/onboarding/paywall')}

                    >
                        <Text className="text-base font-semibold text-gray-900">I don't know</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}