import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface CompletionModalProps {
    visible: boolean;
    onClose: () => void;
    taskCount: number;
}

const Bubble = ({ emoji, color, size, top, left, right, delay }: any) => (
    <Animated.View
        entering={ZoomIn.delay(delay).springify()}
        className={`absolute rounded-full items-center justify-center shadow-sm ${color}`}
        style={{
            width: size,
            height: size,
            top: top,
            left: left,
            right: right
        }}
    >
        <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </Animated.View>
);

export const CompletionModal = ({ visible, onClose, taskCount }: CompletionModalProps) => {
    const [tab, setTab] = useState<'Today' | 'Week'>('Today');

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent={true}>
            <View className="flex-1 bg-white">
                <SafeAreaProvider>
                    <SafeAreaView className="flex-1">
                        {/* --- Header --- */}
                        <View className="flex-row justify-end items-center px-6 py-4 gap-4">
                            <TouchableOpacity className="bg-[#8B7EFF] px-5 py-2 rounded-full">
                                <Text className="text-white font-bold text-sm">Share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onClose} className="bg-gray-100 p-2 rounded-full">
                                <Ionicons name="close" size={24} color="#1C1C1E" />
                            </TouchableOpacity>
                        </View>

                        {/* --- Main Content --- */}
                        <View className="flex-1 items-center justify-center relative">

                            {/* Floating Bubbles Decoration */}
                            {/* Top Left Group */}
                            <Bubble emoji="🧹" color="bg-blue-200" size={60} top="15%" left="15%" delay={100} />
                            <Bubble emoji="🍳" color="bg-purple-200" size={50} top="10%" left="35%" delay={200} />
                            <Bubble emoji="🏎️" color="bg-green-100" size={55} top="18%" right="20%" delay={300} />

                            {/* Right/Bottom Scatter */}
                            <Bubble emoji="⌛" color="bg-orange-100" size={65} top="45%" right="5%" delay={400} />
                            <Bubble emoji="🍽️" color="bg-purple-300" size={60} top="55%" right="15%" delay={500} />
                            <Bubble emoji="📚" color="bg-blue-100" size={50} top="65%" right="25%" delay={600} />


                            {/* Text Content */}
                            <Animated.View entering={FadeInDown.delay(300).springify()} className="items-center z-10">
                                <Text className="text-4xl font-serif text-center text-[#1C1C1E] mb-2 leading-tight">
                                    You completed{'\n'}
                                    {taskCount} tasks 🎉
                                </Text>
                                <Text className="text-gray-500 font-medium mt-4">
                                    Well done! Keep it up - see you tomorrow.
                                </Text>
                            </Animated.View>


                            {/* Segmented Control */}
                            <Animated.View
                                entering={FadeInDown.delay(500).springify()}
                                className="flex-row bg-[#F2F2F7] p-1 rounded-full mt-12 w-[80%]"
                            >
                                <TouchableOpacity
                                    onPress={() => setTab('Today')}
                                    className={`flex-1 py-3 rounded-full items-center ${tab === 'Today' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Text className={`font-semibold ${tab === 'Today' ? 'text-black' : 'text-gray-500'}`}>Today</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setTab('Week')}
                                    className={`flex-1 py-3 rounded-full items-center ${tab === 'Week' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Text className={`font-semibold ${tab === 'Week' ? 'text-black' : 'text-gray-500'}`}>This week</Text>
                                </TouchableOpacity>
                            </Animated.View>

                        </View>

                    </SafeAreaView>
                </SafeAreaProvider>

            </View>
        </Modal>
    );
};