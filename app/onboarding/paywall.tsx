import { LaurelWreath } from '@/components/Graphics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaywallScreen() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

    const handleClose = () => {
        // Navigate to Notifications screen when canceled/closed
        router.replace('/onboarding/questionnaire/notifications');
    };

    return (
        <View className="flex-1 bg-white">
            {/* Background Gradient */}
            <LinearGradient
                colors={['#FFFFFF', '#E0D9FF']} // White to Soft Lavender
                locations={[0.2, 1]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    {/* Header Image & Close Button */}
                    <View className="relative items-center pt-4">
                        <TouchableOpacity
                            onPress={handleClose}
                            className="absolute top-4 right-5 z-10 w-8 h-8 bg-black/5 rounded-full items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="black" />
                        </TouchableOpacity>

                        {/* Illustration Placeholder (Using a generic view or image) */}
                        {/* Ideally replace source with your specific asset */}
                        <View className="w-full h-64 items-center justify-center mb-6">
                            {/* Recreating the 'Moon' graphic element from screenshot */}
                            <View className="absolute top-0 right-0">
                                <Ionicons name="moon" size={80} color="#8B7EFF" style={{ transform: [{ rotate: '-15deg' }] }} />
                            </View>

                            {/* Main Illustration Placeholder */}
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png' }} // Placeholder for community illustration
                                style={{ width: 300, height: 200, resizeMode: 'contain' }}
                            />
                        </View>

                        <Text className="text-3xl font-serif text-center px-8 mb-8 text-[#1C1C1E]">
                            Carefully crafted for neurodivergent people
                        </Text>
                    </View>

                    {/* Pricing Cards */}
                    <View className="px-5 flex-row gap-3 mb-8">

                        {/* Monthly Plan */}
                        <TouchableOpacity
                            onPress={() => setSelectedPlan('monthly')}
                            className={`flex-1 p-4 rounded-2xl border-2 ${selectedPlan === 'monthly' ? 'border-black bg-white' : 'border-gray-100 bg-white/50'}`}
                        >
                            <Text className="text-xs font-bold text-gray-500 uppercase mb-2">Monthly Plan</Text>
                            <Text className="text-3xl font-bold text-black mb-1">$12.00</Text>
                            <Text className="text-xs text-gray-500">(Billed monthly)</Text>
                            <Text className="text-xs font-bold text-black mt-1">No trial</Text>
                        </TouchableOpacity>

                        {/* Annual Plan (Highlighted) */}
                        <TouchableOpacity
                            onPress={() => setSelectedPlan('annual')}
                            className={`flex-1 p-4 rounded-2xl border-2 relative ${selectedPlan === 'annual' ? 'border-black bg-white' : 'border-gray-100 bg-white/50'}`}
                        >
                            {/* Badge */}
                            <View className="absolute -top-3 left-0 right-0 items-center">
                                <View className="bg-[#A89AFF] px-3 py-1 rounded-full">
                                    <Text className="text-[10px] font-bold text-white uppercase">Most Popular</Text>
                                </View>
                            </View>

                            <Text className="text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Annual Plan</Text>
                            <Text className="text-3xl font-bold text-black mb-1">$60.00</Text>
                            <Text className="text-xs text-gray-500">(Billed yearly)</Text>
                            <Text className="text-xs font-bold text-black mt-1">7 days trial</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Awards Section */}
                    <View className="flex-row justify-center gap-6 mb-8">
                        {/* Left Award */}
                        <View className="items-center">
                            <View className="flex-row items-center">
                                <LaurelWreath size={30} flipped={false} />
                                <Ionicons name="logo-apple" size={16} color="black" style={{ marginHorizontal: 2 }} />
                                <LaurelWreath size={30} flipped={true} />
                            </View>
                            <Text className="text-[10px] font-bold text-center mt-1">App of the Year{'\n'}2025</Text>
                        </View>

                        {/* Right Award */}
                        <View className="items-center">
                            <View className="flex-row items-center">
                                <LaurelWreath size={30} flipped={false} />
                                <Ionicons name="logo-apple" size={16} color="black" style={{ marginHorizontal: 2 }} />
                                <LaurelWreath size={30} flipped={true} />
                            </View>
                            <Text className="text-[10px] font-bold text-center mt-1">Apple Design Award{'\n'}2024 Finalist</Text>
                        </View>
                    </View>

                    <Text className="text-center font-serif text-lg text-gray-800 mb-6">
                        Over 8000+ five-star reviews
                    </Text>

                    {/* CTA Button */}
                    <View className="px-5">
                        <TouchableOpacity
                            className="w-full bg-black py-4 rounded-full items-center mb-3"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-bold text-base">Start 7 days free trial</Text>
                        </TouchableOpacity>

                        <Text className="text-[10px] text-center text-gray-500 leading-4">
                            7 days free trial, <Text className="font-bold text-black">S$ 60.00/yr.</Text>{'\n'}
                            No commitment. Cancel anytime.
                        </Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}