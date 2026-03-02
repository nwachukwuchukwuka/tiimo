// import { Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Helper for stacked avatars
// const AvatarStack = ({ count, initials }: { count: string | number, initials: string }) => (
//     <View className="relative w-12 h-8">
//         {/* Back Circle */}
//         <View className="absolute left-0 top-0 w-8 h-8 rounded-full bg-pink-100 items-center justify-center border border-white z-10">
//              <Text className="text-[10px] font-bold text-black">{initials}</Text>
//         </View>
//         {/* Front Circle */}
//         <View className="absolute left-5 top-0 w-10 h-8 rounded-full bg-gray-200 items-center justify-center border border-white z-0 pl-3">
//              <Text className="text-[10px] font-bold text-gray-600">{count}</Text>
//         </View>
//     </View>
// );

// const QuestionItem = ({ date, question, stackInitials, stackCount, color = "bg-pink-100" }: any) => (
//   <TouchableOpacity className="flex-row items-center py-5 border-b border-gray-100">
//       {/* Avatar Stack */}
//       <View className="mr-4">
//           <View className="relative w-14 h-8">
//               <View className={`absolute left-0 top-0 w-8 h-8 rounded-full ${color} items-center justify-center border-2 border-white z-20`}>
//                   <Text className="text-[10px] font-bold text-black">{stackInitials}</Text>
//               </View>
//               <View className="absolute left-5 top-0 w-10 h-8 rounded-full bg-gray-200 items-center justify-center border-2 border-white z-10 pl-2">
//                   <Text className="text-[10px] font-bold text-gray-600">{stackCount}</Text>
//               </View>
//           </View>
//       </View>

//       {/* Content */}
//       <View className="flex-1 pr-4">
//           <Text className="text-xs text-gray-500 mb-1">{date}</Text>
//           <Text className="text-base font-medium text-[#1C1C1E] leading-5">{question}</Text>
//       </View>

//       <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
//   </TouchableOpacity>
// );

// export default function QuestionsScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView className="flex-1 bg-white" edges={['top']}>
//         <Stack.Screen options={{ headerShown: false }} />
        
//         <View className="px-6 py-2 mb-4">
//             <TouchableOpacity onPress={() => router.back()}>
//                 <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
//             </TouchableOpacity>
//         </View>

//         <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
//             <Text className="text-4xl font-serif text-[#1C1C1E] mb-8">Previous questions</Text>

//             <QuestionItem 
//                 date="Jul 15, 2025"
//                 question="What helps you stay present during busy moments?"
//                 stackInitials="AS"
//                 stackCount="-37"
//                 color="bg-purple-100"
//             />
//             <QuestionItem 
//                 date="Jul 14, 2025"
//                 question="What's a small step you've taken recently that's made a big difference?"
//                 stackInitials="RY"
//                 stackCount="-12"
//                 color="bg-green-100"
//             />
//             <QuestionItem 
//                 date="Jul 13, 2025"
//                 question="How do you approach setting meaningful goals?"
//                 stackInitials="IS"
//                 stackCount="+4"
//                 color="bg-green-100"
//             />
//              <QuestionItem 
//                 date="Jul 12, 2025"
//                 question="What's one way you show kindness to yourself?"
//                 stackInitials="RM"
//                 stackCount="+6"
//                 color="bg-orange-100"
//             />
//              <QuestionItem 
//                 date="Jul 11, 2025"
//                 question="How do you bring more balance into your daily routine?"
//                 stackInitials="JA"
//                 stackCount="+1"
//                 color="bg-pink-100"
//             />
//             <QuestionItem 
//                 date="Jul 10, 2025"
//                 question="What's something you're proud of from your journey so far?"
//                 stackInitials="HR"
//                 stackCount="+7"
//                 color="bg-orange-100"
//             />
//              <QuestionItem 
//                 date="Jul 9, 2025"
//                 question="How do you define personal growth in your life?"
//                 stackInitials="MR"
//                 stackCount=""
//                 color="bg-blue-100"
//             />
//         </ScrollView>
//     </SafeAreaView>
//   );
// }

import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Helper for stacked avatars
const AvatarStack = ({ count, initials }: { count: string | number, initials: string }) => (
    <View className="relative w-12 h-8">
        {/* Back Circle */}
        <View className="absolute left-0 top-0 w-8 h-8 rounded-full bg-pink-100 items-center justify-center border border-white z-10">
             <Text className="text-[10px] font-bold text-black">{initials}</Text>
        </View>
        {/* Front Circle */}
        <View className="absolute left-5 top-0 w-10 h-8 rounded-full bg-gray-200 items-center justify-center border border-white z-0 pl-3">
             <Text className="text-[10px] font-bold text-gray-600">{count}</Text>
        </View>
    </View>
);

// Updated to accept onPress
const QuestionItem = ({ date, question, stackInitials, stackCount, color = "bg-pink-100", onPress }: any) => (
  <TouchableOpacity 
    onPress={onPress} 
    activeOpacity={0.7}
    className="flex-row items-center py-5 border-b border-gray-100"
  >
      {/* Avatar Stack */}
      <View className="mr-4">
          <View className="relative w-14 h-8">
              <View className={`absolute left-0 top-0 w-8 h-8 rounded-full ${color} items-center justify-center border-2 border-white z-20`}>
                  <Text className="text-[10px] font-bold text-black">{stackInitials}</Text>
              </View>
              <View className="absolute left-5 top-0 w-10 h-8 rounded-full bg-gray-200 items-center justify-center border-2 border-white z-10 pl-2">
                  <Text className="text-[10px] font-bold text-gray-600">{stackCount}</Text>
              </View>
          </View>
      </View>

      {/* Content */}
      <View className="flex-1 pr-4">
          <Text className="text-xs text-gray-500 mb-1">{date}</Text>
          <Text className="text-base font-medium text-[#1C1C1E] leading-5">{question}</Text>
      </View>

      <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

export default function QuestionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <Stack.Screen options={{ headerShown: false }} />
        
        <View className="px-6 py-2 mb-4">
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
            </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            <Text className="text-4xl font-serif text-[#1C1C1E] mb-8">Previous questions</Text>

            {/* This item links to the detail page */}
            <QuestionItem 
                date="Jul 15, 2025"
                question="What helps you stay present during busy moments?"
                stackInitials="AS"
                stackCount="-37"
                color="bg-purple-100"
                onPress={() => router.push('/knowledge/question-detail')}
            />
            
            <QuestionItem 
                date="Jul 14, 2025"
                question="What's a small step you've taken recently that's made a big difference?"
                stackInitials="RY"
                stackCount="-12"
                color="bg-green-100"
                onPress={() => {}} 
            />
            <QuestionItem 
                date="Jul 13, 2025"
                question="How do you approach setting meaningful goals?"
                stackInitials="IS"
                stackCount="+4"
                color="bg-green-100"
                onPress={() => {}}
            />
             <QuestionItem 
                date="Jul 12, 2025"
                question="What's one way you show kindness to yourself?"
                stackInitials="RM"
                stackCount="+6"
                color="bg-orange-100"
                onPress={() => {}}
            />
             <QuestionItem 
                date="Jul 11, 2025"
                question="How do you bring more balance into your daily routine?"
                stackInitials="JA"
                stackCount="+1"
                color="bg-pink-100"
                onPress={() => {}}
            />
            <QuestionItem 
                date="Jul 10, 2025"
                question="What's something you're proud of from your journey so far?"
                stackInitials="HR"
                stackCount="+7"
                color="bg-orange-100"
                onPress={() => {}}
            />
             <QuestionItem 
                date="Jul 9, 2025"
                question="How do you define personal growth in your life?"
                stackInitials="MR"
                stackCount=""
                color="bg-blue-100"
                onPress={() => {}}
            />
        </ScrollView>
    </SafeAreaView>
  );
}