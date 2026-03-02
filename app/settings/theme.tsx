import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = [
    { id: 'rainbow', value: ['#FCA5A5', '#FCD34D', '#86EFAC', '#93C5FD'], label: 'Rainbow' },
    { id: 'purple', value: ['#A855F7'], label: 'Purple' },
    { id: 'blue', value: ['#60A5FA'], label: 'Blue' },
    { id: 'orange', value: ['#FB923C'], label: 'Orange' },
    { id: 'pink', value: ['#F472B6'], label: 'Pink' },
    { id: 'black', value: ['#1C1C1E'], label: 'Black' },
    { id: 'green', value: ['#86EFAC'], label: 'Green' },
];

export default function ThemeScreen() {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState('purple');

  const activeColor = COLORS.find(c => c.id === activeTheme)?.value[0] || '#A855F7';

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white border border-gray-100 rounded-full items-center justify-center">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#1C1C1E]">Theme</Text>
      </View>

      <View className="flex-1 items-center justify-center">
          {/* Visual Preview */}
          <View className="relative w-64 h-64 items-center justify-center">
                {/* Background Circle */}
                <View className="absolute w-full h-full rounded-full bg-gray-100 opacity-50" />
                {/* Foreground Arc (Simulated) */}
                <View 
                    style={{ borderTopColor: activeColor, borderRightColor: activeColor }}
                    className="absolute w-full h-full rounded-full border-[30px] border-transparent transform rotate-45" 
                />
                
                {/* Inner Circle */}
                <View className="w-48 h-48 bg-[#F5F5F5] rounded-full" />
          </View>
      </View>

      {/* Color Picker Footer */}
      <View className="pb-10">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
              {COLORS.map((color) => {
                  const isSelected = activeTheme === color.id;
                  return (
                      <TouchableOpacity 
                        key={color.id} 
                        onPress={() => setActiveTheme(color.id)}
                        className={`w-14 h-14 rounded-full items-center justify-center ${isSelected ? 'border-2 border-gray-300' : ''}`}
                      >
                          {color.id === 'rainbow' ? (
                              <View className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
                                  {/* Simple rainbow simulation */}
                                  <View className="flex-row flex-1 h-full">
                                      <View className="flex-1 bg-red-300" />
                                      <View className="flex-1 bg-yellow-300" />
                                      <View className="flex-1 bg-green-300" />
                                      <View className="flex-1 bg-blue-300" />
                                  </View>
                              </View>
                          ) : (
                              <View style={{ backgroundColor: color.value[0] }} className="w-10 h-10 rounded-full" />
                          )}
                      </TouchableOpacity>
                  )
              })}
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}