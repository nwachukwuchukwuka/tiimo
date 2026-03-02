import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutinesIntroScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/onboarding/morning-routines');
        }, 2500); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <View className="flex-1">
            <LinearGradient
                colors={['#ffffff', '#E0D9FF', '#A89AFF']}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 1 }}
            >
                <SafeAreaView className="flex-1 items-center justify-center px-8">
                    <View className="mb-12 items-center justify-center">
                        <View className="w-40 h-40 bg-white/30 rounded-full items-center justify-center backdrop-blur-sm border border-white/40">
                            <Ionicons name="map-outline" size={80} color="#1C1C1E" />
                        </View>
                    </View>

                    <Text className="text-3xl font-serif text-center text-[#1C1C1E] leading-tight mb-4">
                        Pick the routines that fit your morning, day and evenings.
                    </Text>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}