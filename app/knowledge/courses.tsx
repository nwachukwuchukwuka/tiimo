// import { Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const LargeCard = ({ title, subtitle, duration, imageColor, onPress }: any) => (
//   <TouchableOpacity 
//     onPress={onPress}
//     activeOpacity={0.9}
//     className="w-full bg-white rounded-3xl mb-6 overflow-hidden border border-gray-100"
//   >
//     <View className={`w-full h-48 ${imageColor} relative p-6 justify-end`}>
//          {/* Illustration Mock */}
//          <View className="absolute right-[-20] bottom-[-20] opacity-80">
//             <Ionicons name="accessibility" size={140} color="black" />
//          </View>
//     </View>
//     <View className="p-6">
//         <View className="bg-gray-100 self-start px-3 py-1 rounded-full mb-3">
//             <Text className="text-[10px] font-bold text-gray-600 uppercase">{subtitle}</Text>
//         </View>
//         <Text className="text-sm font-bold text-gray-400 uppercase mb-1">{duration}</Text>
//         <Text className="text-2xl font-serif text-[#1C1C1E] leading-8">{title}</Text>
        
//         <View className="flex-row justify-end mt-4">
//             <View className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100">
//                 <Ionicons name="play" size={16} color="black" />
//             </View>
//         </View>
//     </View>
//   </TouchableOpacity>
// );

// export default function CoursesListScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
//         <Stack.Screen options={{ headerShown: false }} />
        
//         <View className="flex-row items-center px-6 py-2 mb-2">
//             <TouchableOpacity onPress={() => router.back()} className="mr-4">
//                 <Ionicons name="arrow-back" size={24} color="black" />
//             </TouchableOpacity>
//         </View>

//         <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
//             <Text className="text-4xl font-serif text-[#1C1C1E] mb-2 leading-tight">
//                 Expert-led courses, made for you
//             </Text>
//             <Text className="text-base text-gray-600 mb-8 leading-6">
//                 Learn at your pace with practical, neuroinclusive guidance from ADHD experts.
//             </Text>

//             <View className="flex-row items-center gap-2 mb-6">
//                 <Text className="text-lg font-serif">Browse all</Text>
//             </View>

//             <LargeCard 
//                 title="Start planning with Tiimo" 
//                 subtitle="Productivity"
//                 duration="6 LESSONS • 11 MINS"
//                 imageColor="bg-orange-50"
//                 onPress={() => router.push('/knowledge/course-detail')}
//             />

//             <LargeCard 
//                 title="You just got your ADHD diagnosis – now what?" 
//                 subtitle="Neurodiversity 101"
//                 duration="7 LESSONS • 30 MINS"
//                 imageColor="bg-blue-200"
//                 onPress={() => router.push('/knowledge/course-detail')}
//             />

//              <LargeCard 
//                 title="Regulating your emotions" 
//                 subtitle="Wellness"
//                 duration="3 LESSONS • 9 MINS"
//                 imageColor="bg-green-100"
//                 onPress={() => router.push('/knowledge/course-detail')}
//             />
//         </ScrollView>
//     </SafeAreaView>
//   );
// }


import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = width - 48; // Full width minus padding
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

// Mock Data matching the screenshots
const COURSES = [
  {
    id: '1',
    tag: 'Productivity',
    title: 'Start planning with Tiimo',
    duration: '6 LESSONS • 11 MINS',
    author: 'WITH BEAUX MIEBACH',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop', // Office/Tech vibe
    color: '#F3E8FF',
  },
  {
    id: '2',
    tag: 'Neurodiversity 101',
    title: 'You just got your ADHD diagnosis – now what?',
    duration: '7 LESSONS • 30 MINS',
    author: 'WITH PASHA MARLOWE',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop', // Portrait vibe
    color: '#DBEAFE',
  },
  {
    id: '3',
    tag: 'Wellness',
    title: 'Regulating your emotions',
    duration: '3 LESSONS • 9 MINS',
    author: 'WITH ELLIE MIDDLETON',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop',
    color: '#DCFCE7',
  }
];

export default function CoursesListScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle Scroll for Pagination Dots
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  const renderItem = ({ item, index }: { item: typeof COURSES[0], index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push('/knowledge/course-detail')}
        style={{ width: CARD_WIDTH, marginRight: index === COURSES.length - 1 ? 0 : CARD_MARGIN }}
        className="h-[420px] rounded-[32px] overflow-hidden relative bg-gray-200 border border-gray-100 shadow-sm"
      >
        <Image 
          source={{ uri: item.image }}
          className="w-full h-full absolute"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />

        {/* Content */}
        <View className="flex-1 p-6 justify-between">
          {/* Top Tag */}
          <View className="self-start bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Text className="text-xs font-bold text-[#1C1C1E]">{item.tag}</Text>
          </View>

          {/* Bottom Info */}
          <View>
            <Text className="text-[10px] font-bold text-white/90 uppercase mb-2 tracking-widest">
              {item.duration}
            </Text>
            
            <Text className="text-3xl font-serif text-white mb-6 leading-9 shadow-sm">
              {item.title}
            </Text>

            <View className="flex-row items-end justify-between">
              <Text className="text-[10px] font-bold text-white/80 uppercase mb-1 tracking-widest">
                {item.author}
              </Text>

              {/* Play Button */}
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
                <Ionicons name="play" size={20} color="black" style={{ marginLeft: 2 }} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background Gradient for Top Section */}
      <LinearGradient
        colors={['#F3E8FF', '#FFFFFF']} // Light purple to white
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.4 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%' }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* Nav Bar */}
        <View className="px-6 py-2">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
                <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            
            {/* Header Content */}
            <View className="px-6 mb-8 flex-row">
                <View className="flex-1 pr-4">
                    <Text className="text-4xl font-serif text-[#1C1C1E] leading-tight mb-4">
                        Expert-led courses, made for you
                    </Text>
                    <Text className="text-sm text-[#1C1C1E] leading-5 font-medium">
                        Learn at your pace with practical, neuroinclusive guidance from ADHD, Autism, and planning experts.
                    </Text>
                </View>

                {/* Illustration Placeholder */}
                <View className="w-32 items-center justify-end">
                    {/* Simulating the line art illustration */}
                    <View className="w-28 h-40">
                         <Image 
                            source={{ uri: 'https://illustrations.popsy.co/amber/surr-hugging-heart.svg' }} // Placeholder illustration
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                         />
                         {/* Fallback if image doesn't load/exist, simulate line art */}
                         <View className="absolute bottom-0 right-0">
                             <Ionicons name="heart-circle-outline" size={64} color="#1C1C1E" />
                         </View>
                    </View>
                </View>
            </View>

            {/* Carousel Section */}
            <View className="mb-4">
                <Text className="px-6 text-xl font-serif text-[#1C1C1E] mb-4">Browse all</Text>
                
                <FlatList
                    data={COURSES}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled={false} // False so we can see peek
                    snapToInterval={SNAP_INTERVAL}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>

            {/* Pagination Dots */}
            <View className="flex-row justify-center gap-2 mb-8">
                {COURSES.map((_, index) => (
                    <View 
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-[#1C1C1E]' : 'bg-gray-300'}`}
                    />
                ))}
            </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}