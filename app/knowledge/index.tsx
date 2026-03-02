import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const HALF_WIDTH = (width - 48 - CARD_GAP) / 2; // Calculation for 2-column grid

// --- Reusable Components ---

// 1. Horizontal Hero Card (Used in Productivity & Expert Sections)
const HeroCard = ({ category, title, imageColor, icon, onPress, isVideo = false }: any) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.9}
    className="w-full bg-white p-4 rounded-2xl border border-gray-100 flex-row items-center mb-4"
  >
    {/* Image/Icon Section */}
    <View className={`w-24 h-24 ${imageColor} rounded-xl items-center justify-center mr-4 relative overflow-hidden`}>
         {/* Placeholder visual */}
         {icon ? (
            <Ionicons name={icon} size={40} color="#1C1C1E" />
         ) : (
            <View className="w-full h-full bg-black/10" /> 
         )}
         
         {isVideo && (
             <View className="absolute bg-black/30 w-full h-full items-center justify-center">
                 <Ionicons name="play-circle" size={24} color="white" />
             </View>
         )}
    </View>

    {/* Text Section */}
    <View className="flex-1 pr-2">
        <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">{category}</Text>
        <Text className="text-lg font-serif font-medium text-[#1C1C1E] leading-6">{title}</Text>
    </View>
  </TouchableOpacity>
);

// 2. Vertical Small Card (Used in grids and horizontal scrolls)
const VerticalCard = ({ category, title, imageColor, imageIcon, onPress, width, height = 'h-28', isDark = false, isVideo = false }: any) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.9}
    style={{ width: width }}
    className="bg-transparent mb-4 mr-3"
  >
    <View className={`w-full ${height} ${imageColor} rounded-2xl mb-3 items-center justify-center relative overflow-hidden border border-gray-100`}>
        {imageIcon ? (
             <Ionicons name={imageIcon} size={32} color={isDark ? "white" : "#1C1C1E"} />
        ) : (
            // Placeholder for photo
            <View className="w-full h-full bg-gray-200" />
        )}

        {isVideo && (
             <View className="absolute bg-black/30 top-2 left-2 p-1 rounded-full">
                 <Ionicons name="play" size={12} color="white" />
             </View>
         )}
    </View>
    <View>
        <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">{category}</Text>
        <Text className="text-base font-medium text-[#1C1C1E] leading-5">{title}</Text>
    </View>
  </TouchableOpacity>
);

// 3. Explore Row Item
const ExploreRow = ({ icon, title, color = "#A855F7", onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center bg-white p-4 rounded-2xl border border-gray-100 mb-3">
        <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-4">
             <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text className="flex-1 text-base font-bold text-[#1C1C1E]">{title}</Text>
        <Ionicons name="arrow-forward" size={20} color="#1C1C1E" />
    </TouchableOpacity>
);

export default function KnowledgeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background Gradient for Header */}
      <LinearGradient
        colors={['#FFE4E1', '#FAFAFA']} // MistyRose to off-white
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header Navigation */}
        <View className="px-6 py-2 mb-2">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
                <Ionicons name="arrow-back" size={26} color="#1C1C1E" />
            </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            
            {/* Page Title */}
            <View className="px-6 mb-8">
                <Text className="text-4xl font-serif text-[#1C1C1E] text-center leading-tight">
                    Learn and plan{'\n'}with Tiimo
                </Text>
            </View>

            {/* --- SECTION 1: PRODUCTIVITY --- */}
            <View className="px-6 mb-10">
                <Text className="text-[10px] font-bold text-gray-500 uppercase mb-1">ROUTINES, FOCUS, AND ENERGY</Text>
                <Text className="text-2xl font-bold text-[#1C1C1E] mb-4">Productivity</Text>

                {/* Large Hero Card */}
                <HeroCard 
                    category="TOOLS AND TRICKS"
                    title="How to prioritize tasks as an ADHD'er"
                    imageColor="bg-white" // Illustration would go here
                    icon="bulb-outline"
                    onPress={() => {}}
                />

                {/* 2 Column Grid */}
                <View className="flex-row justify-between">
                    <VerticalCard 
                        width={HALF_WIDTH}
                        imageColor="bg-[#1C1C1E]" // Dark card
                        isDark={true}
                        category="BRAINS AND PATTERNS"
                        title="How AI takes the mental load out of planning"
                        imageIcon="phone-portrait-outline"
                        onPress={() => {}}
                    />
                    <VerticalCard 
                        width={HALF_WIDTH}
                        imageColor="bg-[#E5E5EA]" // Light gray card
                        category="BRAINS AND PATTERNS"
                        title="Task initiation, explained"
                        imageIcon="hand-left-outline"
                        onPress={() => {}}
                    />
                </View>
            </View>


            {/* --- SECTION 2: EXPERT-LED COURSES --- */}
            <View className="px-6 mb-10">
                <View className="flex-row justify-between items-end mb-4">
                    <View>
                        <Text className="text-[10px] font-bold text-gray-500 uppercase mb-1">COURSES BY ADHD AND AUTISM EXPERTS</Text>
                        <Text className="text-2xl font-bold text-[#1C1C1E]">Expert-led courses</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/knowledge/courses')}>
                        <Text className="text-xs font-bold text-gray-500 mb-1">See all →</Text>
                    </TouchableOpacity>
                </View>

                {/* Large Video Card */}
                <HeroCard 
                    isVideo={true}
                    category="3 LESSONS"
                    title="Avoid the urgency trap with the Eisenhower Matrix"
                    imageColor="bg-purple-300" // Placeholder color for video thumbnail
                    icon="person" // Placeholder for person image
                    onPress={() => router.push('/knowledge/course-detail')}
                />

                {/* 2 Column Grid */}
                <View className="flex-row justify-between">
                    <VerticalCard 
                        width={HALF_WIDTH}
                        isVideo={true}
                        imageColor="bg-green-700" // Placeholder photo color
                        category="4 LESSONS"
                        title="Making friends with your inner critic"
                        imageIcon="person"
                        onPress={() => router.push('/knowledge/course-detail')}
                    />
                    <VerticalCard 
                        width={HALF_WIDTH}
                        isVideo={true}
                        imageColor="bg-blue-300" // Placeholder photo color
                        category="7 LESSONS"
                        title="You just got your ADHD diagnosis - now what?"
                        imageIcon="person"
                        onPress={() => router.push('/knowledge/course-detail')}
                    />
                </View>
            </View>


            {/* --- SECTION 3: NEURODIVERSITY (Horizontal Scroll) --- */}
            <View className="mb-10">
                <View className="px-6 mb-4">
                    <Text className="text-[10px] font-bold text-gray-500 uppercase mb-1">BRAIN DIFFERENCES AND SUPPORT</Text>
                    <Text className="text-2xl font-bold text-[#1C1C1E]">Neurodiversity</Text>
                </View>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                >
                    <VerticalCard 
                        width={160}
                        height="h-32"
                        imageColor="bg-[#F3E8FF]" // Light Purple
                        category="BRAINS AND PATTERNS"
                        title="Unmasking in relationships"
                        imageIcon="happy-outline"
                        onPress={() => {}}
                    />
                    <VerticalCard 
                        width={160}
                        height="h-32"
                        imageColor="bg-[#DBEAFE]" // Light Blue
                        category="AUTISM"
                        title="Your Autism questions, answered"
                        imageIcon="chatbubbles-outline"
                        onPress={() => {}}
                    />
                    <VerticalCard 
                        width={160}
                        height="h-32"
                        imageColor="bg-[#FCE7F3]" // Light Pink
                        category="ADHD"
                        title="Hyperfocus and ADHD"
                        imageIcon="flash-outline"
                        onPress={() => {}}
                    />
                    <VerticalCard 
                        width={160}
                        height="h-32"
                        imageColor="bg-[#FEF3C7]" // Light Yellow
                        category="ADHD"
                        title="ADHD and dopamine"
                        imageIcon="battery-charging-outline"
                        onPress={() => {}}
                    />
                </ScrollView>
            </View>


            {/* --- SECTION 4: EXPLORE MORE --- */}
            <View className="px-6 mb-10">
                <Text className="text-2xl font-bold text-[#1C1C1E] mb-4">Explore more</Text>
                
                <ExploreRow 
                    icon="bulb-outline" 
                    title="Take a free Tiimo course today" 
                    color="#A855F7"
                />
                <ExploreRow 
                    icon="glasses-outline" 
                    title="Follow a guided Pomodoro session on YouTube" 
                    color="#A855F7"
                />
                {/* <ExploreRow 
                    icon="globe-outline" 
                    title="Share your take on today's question of the day" 
                    color="#A855F7"
                /> */}
                <ExploreRow 
    icon="globe-outline" 
    title="Share your take on today's question of the day" 
    color="#A855F7"
    onPress={() => router.push('/knowledge/questions')} // <-- Link added here
/>
            </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}