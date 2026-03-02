import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RemindersSettings() {
  const router = useRouter();
  
  // State 1: Is the main toggle on?
  const [isImportEnabled, setIsImportEnabled] = useState(false);
  
  // State 2: Is the specific "Reminders" list selected?
  const [isListSelected, setIsListSelected] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      
      {/* Header */}
      <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#1C1C1E]">Reminder import</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        
        <Text className="text-gray-500 mb-8 text-sm">
            Tap to show or hide a list from Reminders
        </Text>

        {/* Main Toggle Row */}
        <View className="flex-row items-center justify-between mb-8">
            <Text className="text-base font-bold text-[#1C1C1E]">Reminder import</Text>
            <Switch 
                value={isImportEnabled}
                onValueChange={setIsImportEnabled}
                trackColor={{ false: '#E5E5EA', true: '#8B7EFF' }}
                thumbColor="#FFF"
            />
        </View>

        {/* Conditional Content */}
        {!isImportEnabled ? (
            // State: Off - Show info text
            <View className="flex-row gap-3 pr-4">
                <Ionicons name="information-circle-outline" size={20} color="#9CA3AF" />
                <Text className="text-xs text-gray-500 leading-5 flex-1">
                    Your reminders without date and/or time will appear in your To-do tab. 
                    Reminders with date and/or time will appear in your calendar as tasks.
                </Text>
            </View>
        ) : (
            // State: On - Show List Selection
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setIsListSelected(!isListSelected)}
                className="flex-row items-center justify-between py-2"
            >
                <View className="flex-row items-center gap-4">
                    {/* Color Dot (Orange) */}
                    <View className={`w-8 h-8 rounded-full ${isListSelected ? 'bg-orange-400' : 'bg-orange-200'} items-center justify-center`} />
                    <Text className="text-base text-[#1C1C1E]">Reminders</Text>
                </View>

                {/* Radio Circle / Checkmark */}
                <View 
                    className={`w-6 h-6 rounded-full border items-center justify-center ${isListSelected ? 'bg-black border-black' : 'border-gray-400 bg-transparent'}`}
                >
                    {isListSelected && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
            </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}