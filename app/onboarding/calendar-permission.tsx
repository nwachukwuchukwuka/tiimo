import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CalendarPermissionScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <StatusBar style="dark" />

            <View className="flex-1 px-6 pt-2">

                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <View className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
                        <View className="w-[100%] h-full bg-[#A89AFF] rounded-full" />
                    </View>
                    <TouchableOpacity onPress={() => router.push('/onboarding/calendar-select')}>
                        <Text className="text-xs font-bold text-gray-400 tracking-widest">SKIP</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="gap-4 mb-8">
                        <Text className="text-3xl font-serif text-[#1C1C1E] leading-tight">
                            Import your calendar for a quick start
                        </Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Users who import their personal calendar are 46% more productive in Tiimo.
                        </Text>
                    </View>

                    {/* Phone Mockup Visual */}
                    <View className="items-center">
                        <View
                            style={{ width: width * 0.7, aspectRatio: 9 / 18 }}
                            className="border-[6px] border-[#1C1C1E] rounded-[40px] bg-white overflow-hidden relative shadow-xl pt-12 px-3"
                        >
                            <View className="absolute top-4 self-center w-[30%] h-6 bg-[#1C1C1E] rounded-full z-10" />

                            {/* Calendar App UI */}
                            <View className="flex-1 w-full">
                                <View className="items-center mb-6">
                                    <Text className="text-lg font-serif font-bold text-black">Monday</Text>
                                    <Text className="text-[10px] text-gray-400 uppercase tracking-widest">Dec 12th</Text>
                                </View>

                                {/* Mock Timeline Items */}
                                <View className="gap-3 w-full">
                                    <View className="flex-row gap-2 h-14">
                                        <View className="w-1 h-full rounded-full bg-orange-400" />
                                        <View className="flex-1 border border-gray-100 rounded-xl p-2 flex-row justify-between items-center shadow-sm">
                                            <View>
                                                <Text className="text-xs font-bold text-black">Focus time</Text>
                                                <Text className="text-[10px] text-gray-500">1 hour</Text>
                                            </View>
                                            <View className="bg-orange-100 w-6 h-6 rounded-md items-center justify-center">
                                                <Ionicons name="book" size={10} color="#f97316" />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="flex-row gap-2 h-14">
                                        <View className="w-1 h-full rounded-full bg-green-400" />
                                        <View className="flex-1 border border-gray-100 rounded-xl p-2 flex-row justify-between items-center shadow-sm">
                                            <View>
                                                <Text className="text-xs font-bold text-black">Lunch</Text>
                                                <Text className="text-[10px] text-gray-500">1 hour • No plans</Text>
                                            </View>
                                            <View className="bg-green-100 w-6 h-6 rounded-md items-center justify-center">
                                                <Ionicons name="restaurant" size={10} color="#22c55e" />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="flex-row gap-2 h-14">
                                        <View className="w-1 h-full rounded-full bg-purple-400" />
                                        <View className="flex-1 border border-gray-100 rounded-xl p-2 flex-row justify-between items-center shadow-sm">
                                            <View>
                                                <Text className="text-xs font-bold text-black">Check emails</Text>
                                                <Text className="text-[10px] text-gray-500">30 min</Text>
                                            </View>
                                            <View className="bg-purple-100 w-6 h-6 rounded-md items-center justify-center">
                                                <Ionicons name="mail" size={10} color="#a855f7" />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View className="pt-2 pb-2">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push('/onboarding/calendar-select')}
                        className="w-full bg-[#1C1C1E] py-4 rounded-full items-center justify-center"
                    >
                        <Text className="text-white text-base font-bold">Import calendar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}