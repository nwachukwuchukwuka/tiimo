import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const LESSONS = [
    {
        id: 1,
        title: "Introduction",
        description: "Ellie introduces the importance of emotional regulation",
        videoTitle: "Introduction to emotional regulation",
        duration: "2M",

         tag: "Video 1"
    },
    {
        id: 2,
        title: "Introduction",
        description: "Ellie introduces the importance of emotional regulation", // Using same text as placeholder for screenshot match
        videoTitle: "Introduction to emotional regulation",
        duration: "2M",
        tag: "Video 1"
    },
    {
        id: 3,
        title: "Summary",
        description: "Reflect and explore how to build these techniques into your routine",
        videoTitle: "Your emotional toolbox",
        duration: "2M",
        tag: "Video 1"
    }
];

export default function CourseProgressScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2

  const lesson = LESSONS[currentStep];
  const isLast = currentStep === LESSONS.length - 1;

  const handleNext = () => {
      if (isLast) {
          router.back();
      } else {
          setCurrentStep(prev => prev + 1);
      }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Top Header */}
        <View className="px-6 py-2">
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Lesson {currentStep + 1}/3
                </Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Segmented Progress Bar */}
            <View className="flex-row gap-2 mb-8">
                {LESSONS.map((_, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    return (
                        <View key={index} className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden relative">
                            {/* Fill */}
                            {(isActive || isCompleted) && (
                                <View className="absolute left-0 top-0 bottom-0 w-full bg-[#A89AFF]" />
                            )}
                            
                            {isActive && (
                                <View className="absolute right-0 -top-1 w-3 h-3 bg-[#A89AFF] rounded-full items-center justify-center">
                                    <Ionicons name="checkmark" size={8} color="white" />
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>

        <ScrollView className="flex-1 px-6">
            
            {/* Lesson Tag */}
            <View className="bg-gray-100 self-start px-3 py-1.5 rounded-lg mb-4">
                <Text className="text-xs font-bold text-gray-600">Lesson {currentStep + 1}</Text>
            </View>

            {/* Title & Desc */}
            <Text className="text-4xl font-serif text-[#1C1C1E] mb-4">{lesson.title}</Text>
            <Text className="text-base text-gray-600 leading-6 mb-10">
                Get to know Ellie and learn the basics of emotional regulation
            </Text>

            {/* Video Card */}
            <TouchableOpacity 
                activeOpacity={0.9}
                className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
            >
                <View className="flex-row justify-between items-start mb-2">
                    <View className="bg-gray-100 px-2 py-1 rounded-md">
                         <Text className="text-[10px] font-bold text-gray-500 uppercase">{lesson.tag}</Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-400">{lesson.duration}</Text>
                </View>

                <Text className="text-2xl font-serif text-[#1C1C1E] mb-4 leading-8">
                    {lesson.videoTitle}
                </Text>
                
                <Text className="text-sm text-gray-500 mb-6 leading-5">
                    {lesson.description}
                </Text>

                <View className="flex-row justify-end">
                    <View className="w-12 h-12 bg-[#1C1C1E] rounded-full items-center justify-center">
                        <Ionicons name="play" size={20} color="white" style={{ marginLeft: 2 }} />
                    </View>
                </View>
            </TouchableOpacity>

        </ScrollView>

        {/* Footer */}
        <View className="px-6 py-4 border-t border-gray-100">
            <TouchableOpacity 
                onPress={handleNext}
                className="w-full bg-[#1C1C1E] py-4 rounded-full flex-row items-center justify-between px-6"
            >
                <Text className="text-white font-bold text-base">
                    {isLast ? 'Complete course' : 'Next lesson'}
                </Text>
                <Ionicons name={isLast ? "checkmark" : "arrow-forward"} size={20} color="white" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}