import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type ChatHistoryItem = {
    id: string;
    date: string;
    title: string;
};

const HISTORY_DATA: ChatHistoryItem[] = [
    { id: '1', date: 'FRIDAY, JAN 9', title: 'Evening Wind Down' },
    { id: '2', date: 'FRIDAY, JAN 9', title: 'Evening Wind Down' },
    { id: '3', date: 'FRIDAY, JAN 9', title: 'Add New Item' },
    { id: '4', date: 'FRIDAY, JAN 9', title: 'Weekly Planning' },
    { id: '5', date: 'FRIDAY, JAN 9', title: 'Move Unfinished Tasks' },
];

type Props = {
    visible: boolean;
    onClose: () => void;
    onNewChat: () => void;
};

export default function ChatHistorySidebar({ visible, onClose, onNewChat }: Props) {
    if (!visible) return null;

    return (
        <View style={StyleSheet.absoluteFill} className="z-50 flex-row">
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={StyleSheet.absoluteFill}
            >
                <Pressable
                    onPress={onClose}
                    className="flex-1 bg-black/30"
                />
            </Animated.View>

            <Animated.View
                entering={SlideInLeft.duration(300)}
                exiting={SlideOutLeft.duration(300)}
                className="w-[75%] h-full bg-white shadow-xl"
            >
                <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                    <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
                        <Text className="text-2xl font-bold text-gray-900">Chat history</Text>

                        <TouchableOpacity
                            onPress={onNewChat}
                            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
                        >
                            <Feather name="edit-3" size={18} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        className="flex-1 px-6"
                        showsVerticalScrollIndicator={false}
                    >
                        {HISTORY_DATA.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                className="mb-6 active:opacity-60"
                                onPress={onClose}
                            >
                                <Text className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-wider">
                                    {item.date}
                                </Text>
                                <Text className="text-base font-medium text-gray-900 leading-tight">
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="p-6 border-t border-gray-100">
                        <TouchableOpacity className="flex-row items-center gap-3">
                            <Ionicons name="settings-outline" size={20} color="#666" />
                            <Text className="text-gray-600 font-medium">Settings</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </Animated.View>
        </View>
    );
}