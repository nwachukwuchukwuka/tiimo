import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_CALENDARS = [
    { id: '1', title: 'Personal', email: 'alex@gmail.com', color: '#60A5FA' },
    { id: '2', title: 'Work', email: 'alex.smith@corp.com', color: '#F87171' },
    { id: '3', title: 'Family', email: 'family@shared.com', color: '#34D399' },
    { id: '4', title: 'Birthdays', email: 'contacts@gmail.com', color: '#FBBF24' },
];

export default function CalendarSelectScreen() {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2']);

    const toggleCalendar = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <StatusBar style="dark" />

            <View className="flex-1 px-6 pt-2">

                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <View className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
                        <View className="w-[100%] h-full bg-[#A89AFF] rounded-full" />
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/onboarding/morning-routines')}
                    >
                        <Text className="text-xs font-bold text-gray-400 tracking-widest">SKIP</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Text Content */}
                    <View className="gap-4 mb-8">
                        <Text className="text-3xl font-serif text-[#1C1C1E] leading-tight">
                            Select calendars to import
                        </Text>
                        <Text className="text-base text-gray-600 leading-6">
                            You can always change this and the visuals in your settings.
                        </Text>
                    </View>

                    {/* Calendars List */}
                    {/* <View className="gap-2">
                        {MOCK_CALENDARS.map((cal) => (
                            <View
                                key={cal.id}
                                className="flex-row items-center justify-between py-4 border-b border-gray-100"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View style={{ backgroundColor: cal.color }} className="w-3 h-3 rounded-full" />
                                    <View>
                                        <Text className="text-base font-semibold text-[#1C1C1E]">{cal.title}</Text>
                                        <Text className="text-sm text-gray-400">{cal.email}</Text>
                                    </View>
                                </View>

                                <Switch
                                    value={selectedIds.includes(cal.id)}
                                    onValueChange={() => toggleCalendar(cal.id)}
                                    trackColor={{ false: '#E5E5EA', true: '#1C1C1E' }}
                                    thumbColor="#FFFFFF"
                              
                                />
                            </View>
                        ))}
                    </View> */}

                </ScrollView>

                {/* Footer Button */}
                <View className="pt-2 pb-2">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        // onPress={() => router.push('/onboarding/morning-routines')}
                        onPress={() => router.push('/onboarding/routines-intro')}
                        className="w-full bg-[#1C1C1E] py-4 rounded-full items-center justify-center"
                    >
                        <Text className="text-white text-base font-bold">Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}