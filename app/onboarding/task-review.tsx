import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskReviewScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="px-6 flex-1">

                <View className="bg-purple-50 p-3 rounded-lg flex-row items-center gap-2 mb-6">
                    <Ionicons name="sparkles" size={16} color="#A855F7" />
                    <Text className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                        1 tasks successfully added to your plan
                    </Text>
                </View>

                <Text className="text-3xl font-serif text-[#1C1C1E] mb-6">
                    Pick tasks for your plan
                </Text>

                <ScrollView className="flex-1">
                    <TouchableOpacity className="flex-row items-center p-4 border border-gray-100 rounded-2xl shadow-sm bg-white mb-4">
                        <View className="h-10 w-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                            <Text>📚</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-base text-[#1C1C1E]">Working on school assignment</Text>
                            <Text className="text-gray-400 text-xs mt-1">To-do</Text>
                        </View>
                        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity
                    onPress={() => router.push('/onboarding/commit')}
                    className="bg-[#1C1C1E] py-4 rounded-full flex-row items-center justify-between px-6"
                >
                    <Text className="text-white font-bold text-base">Add tasks (1)</Text>
                    <Ionicons name="arrow-up" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}