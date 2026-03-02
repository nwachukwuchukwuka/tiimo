import { Button } from '@/components/ui/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
    const router = useRouter();


    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 relative justify-center items-center overflow-hidden">
                <LinearGradient
                    colors={['#E0D9FF', '#FFFFFF']}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
                />

                <View className="absolute top-10 left-[-50] w-64 h-64 bg-purple-300 rounded-full opacity-30 blur-3xl" />

                <View
                    className="bg-black/80 rounded-[40px] border-4 mt-16 border-gray-800 shadow-2xl"
                    style={{ width: width * 0.6, height: width * 0.9 }}
                >
                    <View className="w-full h-full bg-white rounded-[36px] items-center justify-center">
                        <Text className="text-gray-400">App Preview</Text>
                    </View>
                </View>
            </View>

            <SafeAreaView edges={['bottom']} className="px-6 pb-6 bg-transparent">
                <View className="gap-8">
                    <View>
                        <Text className="text-4xl font-serif text-center text-[#1C1C1E] leading-tight">
                            All-in-one planning and productivity
                        </Text>
                    </View>

                    <View className="gap-3">
                        <Button
                            title="Sign in with Apple"
                            variant="apple"
                            icon="logo-apple"
                            onPress={() => { }}
                        />
                        <Button
                            title="Continue with email"
                            onPress={() => router.push('/sign-up')}
                        />
                    </View>

                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-center text-gray-500 font-medium">
                            Already have an account? <Text className="underline text-[#1C1C1E]">Log in here</Text>
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}
