import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PlanAiModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PlanAiModal = ({ visible, onClose }: PlanAiModalProps) => {
  const [text, setText] = useState('');

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        
        {/* Drag Handle Area */}
        <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
        </View>

        <View className="flex-1 px-6">
            <Text className="text-3xl font-serif text-[#1C1C1E] mb-2">Plan with AI</Text>
            <Text className="text-base text-gray-500 mb-8 leading-5">
                Use Co-planner to turn your ideas into scheduled tasks in seconds
            </Text>

            {/* Input Container with Gradient Background */}
            <LinearGradient
                colors={['#E0D9FF', '#F3E8FF', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 32, padding: 4, height: 400 }}
            >
                <View className="flex-1 bg-white/40 rounded-[28px] p-6 justify-between border border-white/50">
                    
                    {/* Placeholder / Input */}
                    <TextInput 
                        placeholder="Speak your plans"
                        placeholderTextColor="#A1A1AA"
                        multiline
                        style={{ fontSize: 24, fontFamily: 'serif', color: '#1C1C1E' }}
                        value={text}
                        onChangeText={setText}
                    />

                    {/* Footer inside card */}
                    <View className="flex-row justify-between items-end">
                        <Text className="text-gray-400 text-sm">English</Text>
                        
                        {/* Mic Button */}
                        <TouchableOpacity className="w-14 h-14 bg-[#1C1C1E] rounded-full items-center justify-center border-4 border-gray-100">
                            <Ionicons name="mic" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>

        {/* Footer Button */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className="p-6 pb-10">
                <TouchableOpacity 
                    onPress={onClose}
                    className="bg-[#1C1C1E] py-4 rounded-full items-center"
                >
                    <Text className="text-white font-bold text-base">Done</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};