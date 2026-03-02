import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
    active: '#1C1C1E',
    inactive: '#F2F2F7',
    accentText: '#8B7EFF',
    border: '#E5E5EA',
};

export default function UpdatesModal() {
    const router = useRouter();
    const [selection, setSelection] = useState<'yes' | 'no' | null>(null);

    const getCardStyle = (type: 'yes' | 'no') => {
        const isSelected = selection === type;
        return `flex-row items-center p-5 rounded-2xl border bg-white gap-4 ${isSelected ? 'border-black' : 'border-gray-200'
            }`;
    };

    const RadioIcon = ({ selected }: { selected: boolean }) => (
        <View className={`h-6 w-6 rounded-full items-center justify-center border ${selected ? 'bg-black border-black' : 'border-gray-800 bg-transparent'}`}>
            {selected && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <StatusBar style="dark" />

            <View className="flex-1 flex-col">
                <View className="px-4 py-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center justify-center my-8">
                        <View className="h-48 w-full bg-gray-50 rounded-3xl items-center justify-center overflow-hidden">
                            <Ionicons name="newspaper-outline" size={64} color="#ddd" />
                            <Text className="text-gray-400 mt-2 text-xs">Illustration Asset</Text>
                        </View>
                    </View>

                    <Text className="text-4xl font-serif text-[#1C1C1E] mb-10 leading-tight">
                        Would you like updates from Tiimo?
                    </Text>

                    <View className="gap-4">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelection('no')}
                            className={getCardStyle('no')}
                        >
                            <View className="flex-1">
                                <Text className="text-base text-gray-800 leading-6">
                                    <Text style={{ color: COLORS.accentText, fontWeight: '600' }}>No, I don't want </Text>
                                    to be notified when updates are coming and get news and exclusive offers.
                                </Text>
                            </View>
                            <RadioIcon selected={selection === 'no'} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelection('yes')}
                            className={getCardStyle('yes')}
                        >
                            <View className="flex-1">
                                <Text className="text-base text-gray-800 leading-6">
                                    <Text style={{ color: COLORS.accentText, fontWeight: '600' }}>Yes, I would like </Text>
                                    to be notified when updates are coming and get news and exclusive offers.
                                </Text>
                            </View>
                            <RadioIcon selected={selection === 'yes'} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View className="px-6 pb-6 pt-2 bg-white gap-6">
                    <TouchableOpacity
                        disabled={!selection}
                        onPress={() => router.push('/onboarding/questionnaire/needs')}
                        className={`
              flex-row items-center justify-between px-6 py-4 rounded-full
              ${selection ? 'bg-[#1C1C1E]' : 'bg-[#E5E5E5]'}
            `}
                    >
                        <View />
                        <Text className={`text-base font-semibold ${selection ? 'text-white' : 'text-gray-500'}`}>
                            Continue
                        </Text>
                        <Ionicons
                            name="arrow-forward"
                            size={20}
                            color={selection ? 'white' : '#9ca3af'}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text className="text-xs text-center text-gray-500 font-medium">
                            By continuing, you agree to our
                        </Text>
                        <View className="flex-row justify-center gap-1">
                            <Text className="text-xs text-center text-gray-800 underline font-semibold">Privacy Policy</Text>
                            <Text className="text-xs text-center text-gray-500">and</Text>
                            <Text className="text-xs text-center text-gray-800 underline font-semibold">Terms of Use</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
} 