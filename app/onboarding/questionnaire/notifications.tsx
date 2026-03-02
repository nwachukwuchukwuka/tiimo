import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Text Content */}
                <View className="gap-4 mb-8">
                    <Text className="text-3xl font-serif text-[#1C1C1E] leading-tight">
                        Never miss a task!{'\n'}Turn on notifications
                    </Text>
                    <Text className="text-base text-gray-600 leading-6">
                        Forgetful? We'll nudge you with tailored notifications and reminders, so you can stay on top of even the most hectic days.
                    </Text>
                </View>

                {/* Preview Graphic */}
                <View className="items-center">
                    <View
                        style={{ width: width * 0.7, aspectRatio: 9 / 18 }}
                        className="border-[6px] border-[#1C1C1E] rounded-[40px] bg-[#F2F2F7] overflow-hidden relative shadow-xl pt-12 px-4"
                    >
                        {/* Dynamic Island */}
                        <View className="absolute top-4 self-center w-[30%] h-6 bg-[#1C1C1E] rounded-full z-10" />

                        {/* Lock Screen Content */}
                        <View className="items-center w-full">
                            <Text className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Monday, June 6</Text>
                            <Text className="text-[#1C1C1E] text-5xl font-bold mb-8">9:41</Text>

                            {/* Notification Card */}
                            <View className="w-full bg-white/90 p-3 rounded-2xl flex-row gap-3 shadow-sm backdrop-blur-md">
                                <View className="bg-green-100 h-9 w-9 rounded-full items-center justify-center shrink-0">
                                    <Text className="text-lg">🥗</Text>
                                </View>
                                <View className="flex-1 justify-center">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className="text-xs font-bold text-gray-900">Lunch starts in 10 min.</Text>
                                        <Text className="text-[10px] text-gray-400">now</Text>
                                    </View>
                                    <Text className="text-[11px] text-gray-500 leading-tight">
                                        Hi! It's time to eat, set aside time for a healthy meal...
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Button */}
            <View className="pb-2">
                <TouchableOpacity
                    activeOpacity={0.8}
                    // Navigating out of questionnaire flow to the next onboarding step
                    onPress={() => router.push('/onboarding/calendar-permission')} 
                    className="w-full bg-[#1C1C1E] py-4 rounded-full flex-row items-center justify-center gap-2"
                >
                    <Text className="text-white text-base font-bold">Enable Notifications</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}