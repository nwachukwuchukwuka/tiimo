import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- New Lesson Card Component ---
const LessonCard = ({ number, title, description, duration, isActive = false }: any) => (
  <TouchableOpacity 
    activeOpacity={0.9}
    className="bg-white p-5 rounded-3xl border border-gray-100 mb-4 shadow-sm"
  >
      {/* Top Row: Badge & Duration */}
      <View className="flex-row items-center gap-3 mb-3">
          <View className={`${isActive ? 'bg-[#1C1C1E]' : 'bg-gray-200'} px-3 py-1.5 rounded-full`}>
              <Text className={`${isActive ? 'text-white' : 'text-[#1C1C1E]'} text-xs font-bold`}>
                  Lesson {number}
              </Text>
          </View>
          <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text className="text-xs text-gray-500 font-medium">{duration}</Text>
          </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-serif text-[#1C1C1E] mb-2 leading-7">{title}</Text>

      {/* Bottom Row: Description & Arrow Button */}
      <View className="flex-row items-end justify-between gap-4">
          <Text className="flex-1 text-gray-500 leading-5 text-sm">
              {description}
          </Text>
          
          <View className="w-10 h-10 bg-[#1C1C1E] rounded-full items-center justify-center shrink-0">
               <Ionicons name="arrow-forward" size={18} color="white" />
          </View>
      </View>
  </TouchableOpacity>
);

export default function CourseDetailScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FAFAFA]">
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" />
        
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Header Image Area */}
            <View className="w-full h-[400px] relative">
                 <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop' }} 
                    className="w-full h-full"
                    resizeMode="cover"
                 />
                 {/* Gradient Fade to White at Bottom */}
                 <LinearGradient
                    colors={['transparent', 'rgba(250,250,250,0.6)', '#FAFAFA']}
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 }}
                 />

                 {/* Top Navigation */}
                 <SafeAreaView className="absolute top-0 left-0 w-full flex-row justify-between px-6 z-10">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white/20 backdrop-blur-md rounded-full">
                        <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="flex-row items-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-full gap-2">
                        <Text className="font-bold text-xs text-[#1C1C1E]">Watch teaser</Text>
                        <Ionicons name="play-circle" size={16} color="black" />
                    </TouchableOpacity>
                 </SafeAreaView>
            </View>

            {/* Content Body */}
            <View className="px-6 -mt-10">
                <Text className="text-[10px] font-bold text-[#1C1C1E] uppercase mb-2 tracking-widest">3 LESSONS • 9M</Text>
                <Text className="text-4xl font-serif text-[#1C1C1E] leading-10 mb-4">Regulating{'\n'}your emotions</Text>
                
                <View className="bg-[#FFF8F0] self-start px-4 py-1.5 rounded-full mb-6 border border-orange-50">
                     <Text className="text-xs font-bold text-[#1C1C1E]">Wellness</Text>
                </View>

                <Text className="text-gray-600 leading-6 mb-8 text-base">
                    Join Ellie Middleton, an Autistic and ADHD content creator and author, on a journey to better emotional regulation. In this course, Ellie shares practical tips and techniques to help neurodivergent folks manage their emotions.
                </Text>

                {/* Expert Card */}
                <View className="bg-white p-5 rounded-3xl border border-gray-100 flex-row items-center justify-between mb-10 shadow-sm">
                    <View className="flex-1 pr-4">
                        <View className="bg-[#F3F4F6] self-start px-2 py-1 rounded-md mb-2">
                            <Text className="text-[10px] text-gray-500 uppercase font-bold">Meet your expert</Text>
                        </View>
                        <Text className="text-xl font-serif text-[#1C1C1E] mb-1">Ellie Middleton <Text className="text-sm text-gray-400 font-sans">(she/her)</Text></Text>
                        <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ACTIVIST & AUTHOR</Text>
                    </View>
                    <View className="w-16 h-16 rounded-full bg-pink-200 overflow-hidden border-2 border-white shadow-sm">
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop' }} 
                            className="w-full h-full"
                        />
                    </View>
                </View>

                {/* Lessons Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-3xl font-serif text-[#1C1C1E]">All lessons</Text>
                    
                    <View className="flex-row items-center gap-3">
                        {/* Progress Bar Track */}
                        <View className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                             {/* Progress bar fill (0% currently) */}
                             <View className="w-0 h-full bg-black" />
                        </View>
                        {/* Counter Badge */}
                        <View className="bg-gray-200 px-3 py-1 rounded-lg">
                            <Text className="text-xs font-bold text-gray-600">0/3</Text>
                        </View>
                    </View>
                </View>

                {/* Lesson Cards */}
                <LessonCard 
                    number="1" 
                    title="Introduction" 
                    description="Get to know Ellie and learn the basics of emotional regulation" 
                    duration="2M"
                    isActive={true} 
                />
                
                <LessonCard 
                    number="2" 
                    title="Practical techniques for emotional regulation" 
                    description="Discover practical strategies to manage your emotions effectively" 
                    duration="5M"
                />
                
                <LessonCard 
                    number="3" 
                    title="Summary" 
                    description="Reflect and explore how to build these techniques into your routine" 
                    duration="2M"
                />

            </View>
        </ScrollView>

        {/* Sticky Footer */}
        <SafeAreaView edges={['bottom']} className="absolute bottom-0 w-full bg-white border-t border-gray-100">
            <View className="px-6 py-4">
                <TouchableOpacity 
                    onPress={() => router.push('/knowledge/course-progress')}
                    className="w-full bg-[#1C1C1E] py-4 rounded-full items-center shadow-lg"
                >
                    <Text className="text-white font-bold text-base">Start course</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    </View>
  );
}