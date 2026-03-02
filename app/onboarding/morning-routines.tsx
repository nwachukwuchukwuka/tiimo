import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HABITS = [
    { id: '1', label: 'Wake up', icon: '🌅' },
    { id: '2', label: 'Morning prayer', icon: '🛐' },
    { id: '3', label: 'Make bed', icon: '🛏️' },
    { id: '4', label: 'Brush teeth', icon: '🪥' },
    { id: '5', label: 'Drink water', icon: '💧' },
    { id: '6', label: 'Take meds', icon: '💊' },
    { id: '7', label: 'Shower', icon: '🚿' },
    { id: '8', label: 'Get dressed', icon: '👗' },
    { id: '9', label: 'Breakfast', icon: '🍳' },
    { id: '10', label: 'Have coffee', icon: '☕' },
    { id: '11', label: 'Plan your day', icon: '📝' },
    { id: '12', label: 'Quick tidy', icon: '🧹' },
    { id: '13', label: 'Commute to work', icon: '🚌' },
];

export default function MorningRoutinesScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggleHabit = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="px-6 flex-1">
                {/* Header Tag */}
                <View className="bg-orange-100 self-start px-3 py-1 rounded-full mb-4 mt-2">
                    <Text className="text-[10px] font-bold text-orange-600 tracking-widest uppercase">
                        🔆 Morning
                    </Text>
                </View>

                <Text className="text-4xl font-serif text-[#1C1C1E] mb-2 leading-tight">
                    Add morning routines to your schedule
                </Text>
                <Text className="text-base text-gray-500 mb-8">
                    Pick habits to start your day strong.
                </Text>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="flex-row flex-wrap gap-3">
                        {HABITS.map((habit) => {
                            const isSelected = selected.includes(habit.id);
                            return (
                                <TouchableOpacity
                                    key={habit.id}
                                    onPress={() => toggleHabit(habit.id)}
                                    activeOpacity={0.7}
                                    className={`
                                flex-row items-center px-4 py-3.5 rounded-2xl border
                                ${isSelected ? 'bg-purple-100 border-purple-200' : 'bg-white border-gray-100'}
                            `}
                                >
                                    <Text className="mr-2">{habit.icon}</Text>
                                    <Text className={`font-medium ${isSelected ? 'text-purple-900' : 'text-gray-600'}`}>
                                        {habit.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity className="mt-8 flex-row items-center justify-center gap-2 border border-gray-200 rounded-full py-3.5">
                        <Ionicons name="sparkles" size={16} color="#CA8A04" />
                        <Text className="font-bold text-[#1C1C1E]">Suggest for me</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View className="py-2">
                    <TouchableOpacity
                        // onPress={() => router.push('/onboarding/weekly-plans')}
                        onPress={() => router.push('/onboarding/processing')}
                        className={`w-full py-4 rounded-full items-center ${selected.length > 0 ? 'bg-[#1C1C1E]' : 'bg-gray-200'}`}
                        disabled={selected.length === 0}
                    >
                        <Text className={`font-bold text-base ${selected.length > 0 ? 'text-white' : 'text-gray-400'}`}>
                            {selected.length > 0 ? 'Continue with my routines' : 'Choose at least one to begin'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}