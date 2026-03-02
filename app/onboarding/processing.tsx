import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';

export default function ProcessingScreen() {
    const router = useRouter();

    useEffect(() => {
        // Delay for 3 seconds, then navigate
        const timer = setTimeout(() => {
            // We use 'replace' so the user can't swipe back to this loading screen
            router.replace('/onboarding/weekly-plans');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center px-10">
            <StatusBar barStyle="dark-content" />

            {/* Center Content */}
            <View className="items-center">

                {/* Illustration Area */}
                <View className="mb-10 items-center justify-center relative">
                    {/* Purple Glow Effect behind the image */}
                    <View className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                    {/* 
               Ideally, export the SVG/PNG from your design file.
               I am using a placeholder image that resembles the "hands up" vibe.
            */}
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7650/7650979.png' }}
                        className="w-40 h-40"
                        resizeMode="contain"
                        style={{ tintColor: '#4B3F72' }} // Optional: Tinting it to match a theme
                    />

                    {/* Shadow/Ground element */}
                    <View className="w-12 h-2 bg-black/5 rounded-full mt-4" />
                </View>

                {/* Text */}
                <Text className="text-black text-center text-xl font-medium leading-8 tracking-wide">
                    Routines sorted. Time to capture this week's plans.
                </Text>

            </View>
        </View>
    );
}