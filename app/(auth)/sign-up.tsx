import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValid = name.length > 0 && email.length > 0 && password.length > 0;

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="px-6 pt-4 pb-8 flex-1">

                        <TouchableOpacity onPress={() => router.back()} className="mb-6">
                            <Ionicons name="arrow-back" size={28} color="#1C1C1E" />
                        </TouchableOpacity>

                        <View className="gap-2 mb-8">
                            <Text className="text-4xl font-serif text-[#1C1C1E]">
                                Sign up with email
                            </Text>
                            <Text className="text-base text-gray-600 leading-6">
                                Sign up to start your planning journey and to keep your data safe.
                            </Text>
                        </View>

                        <View className="gap-4 mb-8">
                            <Input
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={setName}
                            />
                            <Input
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Input
                                placeholder="Enter password"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View className="mt-auto">
                            <Button
                                title="Continue"
                                onPress={() => router.push('/onboarding/updates-modal')}
                                // onPress={() => {}}
                                disabled={!isValid}
                            />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}