import { MoodModal } from '@/components/MoodModal';
import { PlanAiModal } from '@/components/PlanAiModal';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data for the week
const WEEK_DAYS = [
    { day: 'Sun', icon: '🌸', active: true, color: '#F87171' }, // Past logged
    { day: 'Mon', icon: '🌸', active: true, color: '#F87171' }, // Past logged
    { day: 'Tue', icon: 'plus', active: false }, // Today (Empty)
    { day: 'Wed', icon: 'plus', active: false },
    { day: 'Thu', icon: 'plus', active: false },
    { day: 'Fri', icon: 'plus', active: false },
    { day: 'Sat', icon: 'plus', active: false },
];

const MENU_ITEMS = [
    { id: '1', label: 'Knowledge', icon: 'planet-outline' },
    { id: '2', label: 'Rate the app', icon: 'star-outline' },
    { id: '3', label: 'Share feedback', icon: 'repeat-outline' },
    { id: '4', label: 'FAQ', icon: 'help-circle-outline' },
    { id: '5', label: 'Follow us on Instagram', icon: 'logo-instagram' },
    { id: '6', label: 'Listen to Changemakers by Tiimo', icon: 'mic-outline' },
];

export default function MeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
   const router = useRouter(); // Add router
  const [planAiVisible, setPlanAiVisible] = useState(false); 

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      
      {/* --- Header --- */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <View className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <Text className="font-bold text-[#1C1C1E]">Alex Smith</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')} className="bg-white p-2.5 rounded-full shadow-sm border border-gray-100">
            <Ionicons name="settings-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* --- Section: Weekly Insights --- */}
        <View className="px-6 mt-4 mb-8">
            <Text className="text-3xl font-serif text-[#1C1C1E] mb-6">My Weekly Insights</Text>

            {/* Mood Tracker Card */}
            <View className="bg-white p-6 rounded-3xl shadow-sm mb-4 border border-gray-50">
                <Text className="text-xl font-serif text-[#1C1C1E] mb-6">Mood and Daily Reflections</Text>
                
                <View className="flex-row justify-between">
                    {WEEK_DAYS.map((item, index) => (
                        <View key={index} className="items-center gap-2">
                            {item.icon === 'plus' ? (
                                <TouchableOpacity 
                                    onPress={() => item.day === 'Tue' ? setModalVisible(true) : {}}
                                    className={`w-10 h-10 rounded-full items-center justify-center ${item.day === 'Tue' ? 'bg-[#1C1C1E]' : 'bg-gray-100'}`}
                                >
                                    <Ionicons name="add" size={20} color={item.day === 'Tue' ? 'white' : '#9CA3AF'} />
                                </TouchableOpacity>
                            ) : (
                                <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center">
                                    <Text className="text-lg">{item.icon}</Text>
                                </View>
                            )}
                            <Text className="text-[10px] font-bold text-gray-400 uppercase">{item.day}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Planning Stats */}
            <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                <Text className="text-xl font-serif text-[#1C1C1E] mb-6">I've been planning every day for</Text>
                
                <View className="flex-row gap-4 mb-6">
                    <View className="flex-1 bg-[#F3E8FF] p-4 rounded-2xl">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Text className="text-3xl font-serif text-[#1C1C1E]">1</Text>
                            <Text className="text-xl">🌱</Text>
                        </View>
                        <Text className="text-[10px] font-bold text-gray-500 uppercase">Days in a row</Text>
                    </View>

                    <View className="flex-1 bg-[#F1F5F9] p-4 rounded-2xl">
                        <Text className="text-3xl font-serif text-[#1C1C1E] mb-1">3</Text>
                        <Text className="text-[10px] font-bold text-gray-500 uppercase">Total days</Text>
                    </View>
                </View>

                <TouchableOpacity className="flex-row items-center justify-center gap-2">
                    <Text className="font-bold text-[#1C1C1E]">Share</Text>
                    <Ionicons name="share-outline" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>


        {/* --- Section: Learn --- */}
        <View className="mb-10">
            <View className="px-6 mb-4">
                <Text className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Learn how to</Text>
                <View className="flex-row items-center gap-2">
                    <Text className="text-2xl font-bold text-[#1C1C1E]">Plan like a pro</Text>
                    <Text className="text-xl">⚡️</Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
                {/* Card 1 */}
                <TouchableOpacity className="w-64 bg-white p-4 rounded-3xl border border-gray-100">
                    <View className="w-full h-32 bg-orange-50 rounded-2xl mb-4 items-center justify-center overflow-hidden relative">
                         <View className="absolute top-2 left-2 bg-black/50 p-1 rounded-full">
                            <Ionicons name="play" size={12} color="white" />
                         </View>
                         <Ionicons name="desktop-outline" size={48} color="#D1D5DB" />
                    </View>
                    <Text className="text-xs font-bold text-gray-400 uppercase mb-1">Web Planner</Text>
                    <Text className="text-lg font-bold text-[#1C1C1E] leading-6">Use Tiimo on desktop</Text>
                </TouchableOpacity>

                {/* Card 2 */}
                <TouchableOpacity 
                  onPress={() => setPlanAiVisible(true)} 
                className="w-64 bg-white p-4 rounded-3xl border border-gray-100">
                    <View className="w-full h-32 bg-purple-50 rounded-2xl mb-4 items-center justify-center overflow-hidden relative">
                         <View className="absolute top-2 left-2 bg-black/50 p-1 rounded-full">
                            <Ionicons name="play" size={12} color="white" />
                         </View>
                         <View className="flex-row">
                             <View className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white -mr-2" />
                             <View className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white" />
                         </View>
                    </View>
                    <Text className="text-xs font-bold text-gray-400 uppercase mb-1">Co-Planner</Text>
                    <Text className="text-lg font-bold text-[#1C1C1E] leading-6">Plan with AI</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

        {/* --- Section: Menu List --- */}
        <View className="bg-white mx-6 rounded-3xl p-2 mb-10 shadow-sm border border-gray-50">
            {MENU_ITEMS.map((item, index) => (
                <TouchableOpacity 
                    key={item.id}
                    onPress={() => router.push('/knowledge')} 
                    className={`flex-row items-center justify-between p-4 ${index !== MENU_ITEMS.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                    <View className="flex-row items-center gap-4">
                        <Ionicons name={item.icon as any} size={22} color="#1C1C1E" />
                        <Text className="text-base font-medium text-[#1C1C1E]">{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>
            ))}
        </View>

        {/* --- Footer --- */}
        <View className="px-6 mb-20 items-center">
            <Text className="text-2xl font-serif text-[#1C1C1E] mb-2 text-center">Planning for every kind of brain</Text>
            <Text className="text-center text-gray-500 text-sm px-4 leading-5 mb-8">
                From research to an app trusted by millions of members worldwide
            </Text>

            <View className="items-center opacity-40">
                <Text className="text-[10px] text-gray-500">App version: 3.36.1 - Build 5125</Text>
                <Text className="text-[10px] text-gray-500">Email: alexsmith.mobbin+1@gmail.com</Text>
                <Text className="text-[10px] text-gray-500">User ID: 89sd-s9d8-s9d8-0000</Text>
            </View>
        </View>

      </ScrollView>

      {/* Floating Character */}
      <View className="absolute bottom-6 right-6">
        <View className="w-14 h-14 bg-purple-100 rounded-full items-center justify-center border border-white shadow-lg">
            <View className="w-10 h-10 bg-[#A89AFF] rounded-full items-center justify-center">
                <Text>👀</Text>
            </View>
        </View>
      </View>

      {/* Mood Modal */}
      <MoodModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
            <PlanAiModal visible={planAiVisible} onClose={() => setPlanAiVisible(false)} />


    </SafeAreaView>
  );
}