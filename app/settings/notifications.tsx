import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ToggleRow = ({ label, value, onValueChange }: any) => (
  <View className="flex-row items-center justify-between py-3">
    <Text className="text-base text-[#1C1C1E]">{label}</Text>
    <Switch 
      value={value} 
      onValueChange={onValueChange}
      trackColor={{ false: '#E5E5EA', true: '#8B7EFF' }}
      thumbColor="#FFF"
    />
  </View>
);

const TimePill = ({ time }: { time: string }) => (
    <View className="bg-gray-200 px-3 py-1 rounded-md">
        <Text className="text-xs font-bold text-gray-700">{time}</Text>
    </View>
);

export default function NotificationsScreen() {
  const router = useRouter();
  const [toggles, setToggles] = useState({
    beforeTask: true,
    taskStart: true,
    halfway: false,
    finished: false,
    allDay: true,
    morning: true,
    afternoon: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#1C1C1E]">Notifications & Sounds</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Sound Selector */}
        <View className="bg-white p-4 rounded-2xl flex-row justify-between items-center mb-8">
            <Text className="text-base font-medium text-[#1C1C1E]">Notification sound</Text>
            <Text className="text-gray-400">System</Text>
        </View>

        {/* Tasks Section */}
        <Text className="text-gray-400 font-bold mb-4">Tasks</Text>
        <View className="bg-white p-4 rounded-3xl mb-8">
            <ToggleRow label="Before task" value={toggles.beforeTask} onValueChange={() => toggle('beforeTask')} />
            
            <View className="py-4">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-[#1C1C1E]">Set the number of minutes</Text>
                    <Text className="text-sm font-bold text-[#1C1C1E]">10 Min</Text>
                </View>
                {/* Mock Slider */}
                <View className="h-1 bg-gray-200 rounded-full w-full mt-2 relative">
                    <View className="absolute left-0 top-0 h-full w-[20%] bg-[#8B7EFF] rounded-full" />
                    <View className="absolute left-[20%] -top-2 w-6 h-6 bg-white shadow-sm rounded-full border border-gray-100" />
                </View>
            </View>

            <View className="h-[1px] bg-gray-100 my-2" />
            <ToggleRow label="When a task starts" value={toggles.taskStart} onValueChange={() => toggle('taskStart')} />
            <View className="h-[1px] bg-gray-100 my-2" />
            <ToggleRow label="Halfway through task" value={toggles.halfway} onValueChange={() => toggle('halfway')} />
            <View className="h-[1px] bg-gray-100 my-2" />
            <ToggleRow label="When a task is finished" value={toggles.finished} onValueChange={() => toggle('finished')} />
        </View>

        {/* Time of Day Section */}
        <Text className="text-gray-400 font-bold mb-4">Time of day reminders</Text>
        <View className="bg-white p-4 rounded-3xl mb-10">
            <ToggleRow label="All day & anytime" value={toggles.allDay} onValueChange={() => toggle('allDay')} />
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <Text className="text-base text-[#1C1C1E]">At time</Text>
                <TimePill time="7:00 AM" />
            </View>

            <ToggleRow label="Morning" value={toggles.morning} onValueChange={() => toggle('morning')} />
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <Text className="text-base text-[#1C1C1E]">At time</Text>
                <TimePill time="8:00 AM" />
            </View>

            <ToggleRow label="Afternoon" value={toggles.afternoon} onValueChange={() => toggle('afternoon')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}