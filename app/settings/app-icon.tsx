import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data for Icons (Colors representing images)
const ICONS = [
    { id: 'default', type: 'image', src: 'https://github.com/expo/expo/raw/main/templates/expo-template-blank-typescript/assets/icon.png' }, // Placeholder
    { id: 'green', type: 'color', color: '#10B981' },
    { id: 'teal', type: 'color', color: '#14B8A6' },
    { id: 'black', type: 'color', color: '#1C1C1E' },
    { id: 'dark', type: 'color', color: '#374151' },
    { id: 'orange', type: 'color', color: '#F97316' },
    { id: 'burnt', type: 'color', color: '#EA580C' },
    { id: 'purple', type: 'color', color: '#8B5CF6' },
    { id: 'lilac', type: 'color', color: '#A78BFA' },
    { id: 'pink', type: 'color', color: '#F472B6' },
    { id: 'rose', type: 'color', color: '#FB7185' },
    { id: 'blue', type: 'color', color: '#60A5FA' },
    { id: 'sky', type: 'color', color: '#38BDF8' },
    { id: 'rainbow', type: 'gradient', colors: ['#60A5FA', '#F472B6', '#FBBF24'] },
    { id: 'forest', type: 'gradient', colors: ['#10B981', '#065F46'] },
    { id: 'sunset', type: 'gradient', colors: ['#8B5CF6', '#F472B6', '#FBBF24'] },
    { id: 'dawn', type: 'gradient', colors: ['#60A5FA', '#F472B6', '#FEF3C7'] },
];

export default function AppIconScreen() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState('default');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="px-6 pt-2 pb-4 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
            <View className="w-5 h-5 rounded-full bg-purple-200 items-center justify-center">
                <View className="w-3 h-3 bg-[#8B7EFF] rounded-full" />
            </View>
            <Text className="text-lg font-bold text-[#1C1C1E]">App icon</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="flex-row flex-wrap justify-between">
            {ICONS.map((icon) => {
                const isSelected = selectedIcon === icon.id;
                return (
                    <TouchableOpacity 
                        key={icon.id}
                        onPress={() => setSelectedIcon(icon.id)}
                        className={`w-[23%] aspect-square mb-6 items-center justify-center rounded-3xl ${isSelected ? 'border-2 border-black' : ''}`}
                    >
                        <View className="w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-sm items-center justify-center bg-gray-100">
                            {icon.type === 'gradient' ? (
                                <LinearGradient colors={icon.colors!} style={{ width: '100%', height: '100%' }} />
                            ) : icon.type === 'image' ? (
                                <View className="w-full h-full bg-purple-100 items-center justify-center">
                                    <Text>👾</Text>
                                </View>
                            ) : (
                                <View style={{ backgroundColor: icon.color, width: '100%', height: '100%' }} />
                            )}
                            
                            {/* Inner smile curve simulation */}
                            <View className="absolute bottom-3 w-8 h-4 border-b-4 border-white/50 rounded-full" />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}