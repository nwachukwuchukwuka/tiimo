import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // Ensure you have this or use a basic View implementation
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface MoodModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock completed tasks for the reflection step
const COMPLETED_TASKS = [
  { id: '1', title: 'Plan your day', icon: '📝' },
  { id: '2', title: 'Quick tidy', icon: '🧹' },
  { id: '3', title: 'Start work', icon: '💻' },
];

export const MoodModal = ({ visible, onClose }: MoodModalProps) => {
  const [step, setStep] = useState<'SLIDER' | 'REFLECTION'>('SLIDER');
  const [moodValue, setMoodValue] = useState(50); // 0 to 100
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Dynamic visual based on mood
  const getMoodVisual = () => {
    if (moodValue < 30) {
      return { 
        emoji: '☹️', 
        color: '#A855F7', // Purple
        label: 'Very Unpleasant', 
        bgColors: ['#F3E8FF', '#FFFFFF'] as const
      }; 
    } else if (moodValue > 70) {
      return { 
        emoji: '🌞', 
        color: '#F472B6', // Pink
        label: 'Very Pleasant',
        bgColors: ['#FCE7F3', '#FFFFFF'] as const
      };
    }
    return { 
        emoji: '😐', 
        color: '#60A5FA', // Blue
        label: 'Neutral',
        bgColors: ['#DBEAFE', '#FFFFFF'] as const
    };
  };

  const currentMood = getMoodVisual();

  const handleDone = () => {
    // Show brief success toast then move to reflection
    setShowSuccessToast(true);
    setTimeout(() => {
        setShowSuccessToast(false);
        setStep('REFLECTION');
    }, 1500);
  };

  const handleClose = () => {
      setStep('SLIDER');
      setMoodValue(50);
      onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      {/* Background Gradient changes based on mood */}
      <LinearGradient
        colors={step === 'SLIDER' ? currentMood.bgColors : ['#F3E8FF', '#FFFFFF']}
        style={{ flex: 1 }}
      >
        <View className="flex-1 px-6 pt-6">
            
            {/* Header */}
            <View className="flex-row justify-end items-center">
                <TouchableOpacity onPress={handleClose} className="bg-white/50 p-2 rounded-full">
                    <Ionicons name="chevron-down" size={24} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            {/* --- STEP 1: SLIDER --- */}
            {step === 'SLIDER' && (
                <View className="flex-1 justify-between pb-12 mt-10">
                    <View className="items-center">
                        <Text className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Mood</Text>
                        <Text className="text-3xl font-serif text-center text-[#1C1C1E] px-8 leading-9">
                            How did you feel overall Today?
                        </Text>
                    </View>

                    {/* Central Graphic */}
                    <View className="items-center justify-center">
                        <View 
                            className="w-48 h-48 rounded-full items-center justify-center shadow-lg"
                            style={{ backgroundColor: currentMood.color, opacity: 0.8 }}
                        >
                            <View className="w-40 h-40 rounded-full bg-white/20 items-center justify-center blur-xl" />
                            <Text style={{ fontSize: 80 }} className="absolute">{currentMood.emoji}</Text>
                        </View>
                        
                        {/* Success Toast Overlay */}
                        {showSuccessToast && (
                             <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center bg-white/90 rounded-3xl z-10 p-6 shadow-sm">
                                <View className="bg-purple-100 p-4 rounded-full mb-4">
                                     <Ionicons name="checkmark" size={32} color="#6B21A8" />
                                </View>
                                <Text className="text-xl font-serif text-[#1C1C1E]">Logged in Wellbeing</Text>
                             </View>
                        )}
                    </View>

                    {/* Slider & Controls */}
                    <View>
                        <Text className="text-center text-xl font-serif text-[#1C1C1E] mb-8">
                            {currentMood.label}
                        </Text>

                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            value={moodValue}
                            onValueChange={setMoodValue}
                            minimumTrackTintColor="#1C1C1E"
                            maximumTrackTintColor="#D1D5DB"
                            thumbTintColor="#1C1C1E"
                        />
                        
                        <View className="flex-row justify-between px-2 mt-2">
                            <Text className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Very Unpleasant</Text>
                            <Text className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Very Pleasant</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                        onPress={handleDone}
                        className="bg-[#1C1C1E] py-4 rounded-full items-center"
                    >
                        <Text className="text-white font-bold text-base">Done</Text>
                    </TouchableOpacity>
                </View>
            )}


            {/* --- STEP 2: REFLECTION --- */}
            {step === 'REFLECTION' && (
                <View className="flex-1 mt-6">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 rounded-full bg-purple-400 items-center justify-center mb-4 shadow-md opacity-90">
                                <Text className="text-4xl">☹️</Text>
                            </View>
                            <Text className="text-3xl font-serif text-center text-[#1C1C1E] mb-4">
                                Daily reflection
                            </Text>
                            <Text className="text-base text-center text-gray-600 px-4 leading-6">
                                You noted feeling <Text className="font-bold">Very Unpleasant</Text> on January 20th. Could any of these tasks have played a role?
                            </Text>
                        </View>

                        <Text className="text-lg font-serif text-[#1C1C1E] mb-4">
                            Completed tasks ({COMPLETED_TASKS.length})
                        </Text>

                        <View className="gap-3 mb-10">
                            {COMPLETED_TASKS.map((task) => (
                                <View key={task.id} className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center">
                                            <Text className="text-xl">{task.icon}</Text>
                                        </View>
                                        <Text className="font-bold text-[#1C1C1E] text-base">{task.title}</Text>
                                    </View>
                                    <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                                        <Ionicons name="add" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                     {/* Footer Button - Pinned to bottom logic would go here usually, but scrollview is fine for now */}
                     <View className="pb-8">
                        <TouchableOpacity 
                            onPress={handleClose}
                            className="bg-[#1C1C1E] py-4 rounded-full items-center"
                        >
                            <Text className="text-white font-bold text-base">Done</Text>
                        </TouchableOpacity>
                     </View>
                </View>
            )}

        </View>
      </LinearGradient>
    </Modal>
  );
};