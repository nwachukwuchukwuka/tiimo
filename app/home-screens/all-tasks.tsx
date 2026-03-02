import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TASKS_LIST = [
    { id: '1', title: 'Plan your day', duration: '10 m', icon: 'clipboard-text-outline', color: '#FBBF24', bg: 'bg-yellow-100' }, // Yellowish
    { id: '2', title: 'Evening routine', duration: '10 m', icon: 'moon-waning-crescent', color: '#F59E0B', bg: 'bg-pink-50' }, // Pinkish
    { id: '3', title: 'Have dinner', duration: '20 m', icon: 'food-turkey', color: '#22C55E', bg: 'bg-purple-200' }, // Light Purple
    { id: '4', title: 'Lunch', duration: '20 m', icon: 'food-outline', color: '#8B5CF6', bg: 'bg-purple-200' },
];

export default function AllTasksScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Private' | 'Public'>('Private');

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-5 pt-8 pb-4">
                    <Text className="text-3xl font-bold text-black mb-4">Tasks</Text>

                    {/* Search */}
                    <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm mb-4">
                        <Ionicons name="search" size={20} color="black" />
                        <TextInput
                            placeholder="I am looking for"
                            placeholderTextColor="gray"
                            className="flex-1 ml-2 text-base"
                        />
                    </View>

                    <View className="flex-row bg-[#F2F2F7] p-1 rounded-xl">
                        <TouchableOpacity
                            onPress={() => setActiveTab('Private')}
                            className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'Private' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <Text className={`font-bold ${activeTab === 'Private' ? 'text-black' : 'text-gray-500'}`}>Private</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => setActiveTab('Public')}
                            className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'Public' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <Text className={`font-bold ${activeTab === 'Public' ? 'text-black' : 'text-gray-500'}`}>Public</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Task List */}
                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                    {TASKS_LIST.map((task) => (
                        <View
                            key={task.id}
                            className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-100 mb-4"
                        >
                            <View className="mb-6">
                                <Text className="text-lg font-bold text-black mb-1">{task.title}</Text>
                                <View className="flex-row items-center">
                                    <Ionicons name="time-outline" size={18} color="black" />
                                    <Text className="text-sm font-medium text-black ml-1">{task.duration}</Text>
                                </View>
                            </View>

                            {/* Bottom Section: Icon & Button */}
                            <View className="flex-row justify-between items-end">
                                {/* Large Icon Circle */}
                                <View className={`w-16 h-16 rounded-full items-center justify-center ${task.bg}`}>
                                    {/* @ts-ignore */}
                                    <MaterialCommunityIcons name={task.icon} size={32} color={task.color} />
                                </View>

                                {/* Black Arrow Button */}
                                <TouchableOpacity className="w-10 h-10 bg-black rounded-full items-center justify-center">
                                    <Ionicons name="arrow-up" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View className="h-10" />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}