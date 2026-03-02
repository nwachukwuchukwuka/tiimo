import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeeklyPlansScreen() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/task-review');
        }, 2000);
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <View className="w-20 h-20 bg-purple-100 rounded-full items-center justify-center mb-6 animate-pulse">
                    <View className="w-12 h-12 bg-purple-300 rounded-full" />
                </View>
                <Text className="text-xl font-serif text-[#1C1C1E]">Building your tasks...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            {/* Background Gradient */}
            <LinearGradient
                colors={['#A89AFF', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%' }}
            />

            <SafeAreaView className="flex-1" edges={['top']}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6 pt-10">

                    <Text className="text-3xl font-serif text-[#1C1C1E] mb-6">
                        Any other plans this week?
                    </Text>

                    {/* Suggestions */}
                    <View className="gap-2 mb-8">
                        <View className="flex-row items-center gap-2">
                            <Text>📚</Text>
                            <Text className="text-gray-700">Work or school</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Text>✅</Text>
                            <Text className="text-gray-700">To-dos and errands</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Text>💜</Text>
                            <Text className="text-gray-700">Social plans</Text>
                        </View>
                    </View>

                    {/* Input Area */}
                    <View className="bg-white rounded-2xl p-4 shadow-sm min-h-[120px] relative">
                        <TextInput
                            className="text-lg text-[#1C1C1E]"
                            placeholder="Write or speak your plans"
                            placeholderTextColor="#9ca3af"
                            multiline
                            value={text}
                            onChangeText={setText}
                            autoFocus
                        />

                        <View className="absolute bottom-4 right-4 flex-row gap-2">
                            <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                                <Ionicons name="mic" size={20} color="black" />
                            </TouchableOpacity>
                            {text.length > 0 && (
                                <TouchableOpacity onPress={handleNext} className="bg-black p-2 rounded-full">
                                    <Ionicons name="arrow-up" size={20} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}