// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Reusable Checkbox Row
// const CalendarRow = ({ label, icon, isChecked, onPress }: any) => (
//     <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-gray-50 bg-white px-4 rounded-xl mb-2">
//         <View className="flex-row items-center gap-3">
//             <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
//                 {/* Placeholder for calendar icon */}
//                 <Text>{icon}</Text> 
//             </View>
//             <Text className="text-base font-medium text-[#1C1C1E]">{label}</Text>
//         </View>
//         <View className={`w-6 h-6 rounded-full border ${isChecked ? 'bg-black border-black' : 'border-gray-300'} items-center justify-center`}>
//             {isChecked && <Ionicons name="checkmark" size={14} color="white" />}
//         </View>
//     </TouchableOpacity>
// );

// export default function CalendarSettings() {
//   const router = useRouter();
//   const [selected, setSelected] = useState<string[]>(['US Holidays', 'Home', 'Work']);

//   const toggle = (id: string) => {
//     setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
//       <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
//         <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
//             <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
//         </TouchableOpacity>
//         <Text className="text-lg font-bold text-[#1C1C1E]">Calendar import</Text>
//         <View className="ml-auto bg-[#8B7EFF] w-8 h-8 rounded-full items-center justify-center">
//             <Ionicons name="checkmark" size={18} color="white" />
//         </View>
//       </View>

//       <ScrollView className="flex-1 px-6 pt-6">
//         <Text className="text-3xl font-serif text-[#1C1C1E] mb-2 leading-9">
//             Choose and customize your calendars
//         </Text>

//         <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Subscribed Calendars</Text>
//         <CalendarRow label="US Holidays" icon="🇺🇸" isChecked={selected.includes('US Holidays')} onPress={() => toggle('US Holidays')} />

//         <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Default</Text>
//         <CalendarRow label="Home" icon="🏠" isChecked={selected.includes('Home')} onPress={() => toggle('Home')} />
//         <CalendarRow label="Work" icon="💼" isChecked={selected.includes('Work')} onPress={() => toggle('Work')} />
//         <CalendarRow label="Calendar" icon="📅" isChecked={selected.includes('Calendar')} onPress={() => toggle('Calendar')} />

//         <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Other</Text>
//         <CalendarRow label="Birthdays" icon="🎉" isChecked={selected.includes('Birthdays')} onPress={() => toggle('Birthdays')} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Reusable Calendar Row
const CalendarRow = ({ label, icon, isChecked, onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-gray-50 bg-white px-4 rounded-xl mb-2">
        <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                <Text>{icon}</Text> 
            </View>
            <Text className="text-base font-medium text-[#1C1C1E]">{label}</Text>
        </View>
        <View className={`w-6 h-6 rounded-full border ${isChecked ? 'bg-black border-black' : 'border-gray-300'} items-center justify-center`}>
            {isChecked && <Ionicons name="checkmark" size={14} color="white" />}
        </View>
    </TouchableOpacity>
);

// Phone Mockup for Splash
const PhoneMockup = () => (
    <View className="w-[60%] aspect-[9/18] border-[6px] border-[#1C1C1E] rounded-[32px] bg-white overflow-hidden relative shadow-xl self-center mt-8">
        <View className="absolute top-3 self-center w-[30%] h-5 bg-[#1C1C1E] rounded-full z-10" />
        <View className="flex-1 bg-[#FAFAFA] pt-10 px-3">
            {/* Mock Header */}
            <View className="items-center mb-4">
                <Text className="text-xs font-bold text-gray-800">Monday</Text>
                <Text className="text-[8px] text-gray-400">Dec 12th</Text>
            </View>
            {/* Mock Events */}
            <View className="gap-2">
                <View className="flex-row gap-2">
                    <View className="w-1 h-10 bg-orange-400 rounded-full" />
                    <View className="flex-1 bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex-row justify-between">
                        <View><View className="w-12 h-2 bg-gray-200 rounded mb-1" /><View className="w-8 h-1.5 bg-gray-100 rounded" /></View>
                        <View className="w-4 h-4 bg-orange-100 rounded-full" />
                    </View>
                </View>
                <View className="flex-row gap-2">
                    <View className="w-1 h-10 bg-green-400 rounded-full" />
                    <View className="flex-1 bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex-row justify-between">
                        <View><View className="w-10 h-2 bg-gray-200 rounded mb-1" /><View className="w-6 h-1.5 bg-gray-100 rounded" /></View>
                        <View className="w-4 h-4 bg-green-100 rounded-full" />
                    </View>
                </View>
                <View className="flex-row gap-2">
                    <View className="w-1 h-10 bg-purple-400 rounded-full" />
                    <View className="flex-1 bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex-row justify-between">
                        <View><View className="w-14 h-2 bg-gray-200 rounded mb-1" /><View className="w-8 h-1.5 bg-gray-100 rounded" /></View>
                        <View className="w-4 h-4 bg-purple-100 rounded-full" />
                    </View>
                </View>
            </View>
        </View>
    </View>
);

export default function CalendarSettings() {
  const router = useRouter();
  const [showSelection, setShowSelection] = useState(false); // State to toggle views
  const [selected, setSelected] = useState<string[]>(['US Holidays', 'Home', 'Work']);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // --- VIEW 1: SPLASH SCREEN ---
  if (!showSelection) {
      return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="px-6 pt-2 pb-2">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
                    <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-6 pt-4">
                <Text className="text-4xl font-serif text-[#1C1C1E] mb-4 leading-tight">
                    Import your calendar
                </Text>
                <Text className="text-base text-gray-500 leading-6 mb-4">
                    Stay on top of your day with all tasks in one place.
                </Text>
                
                <PhoneMockup />
            </View>

            <View className="p-6">
                <TouchableOpacity 
                    onPress={() => setShowSelection(true)}
                    className="w-full bg-[#1C1C1E] py-4 rounded-full items-center"
                >
                    <Text className="text-white font-bold text-base">Import calendar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      );
  }

  // --- VIEW 2: SELECTION LIST ---
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => setShowSelection(false)} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#1C1C1E]">Calendar import</Text>
        <View className="ml-auto bg-[#8B7EFF] w-8 h-8 rounded-full items-center justify-center">
            <Ionicons name="checkmark" size={18} color="white" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-3xl font-serif text-[#1C1C1E] mb-2 leading-9">
            Choose and customize your calendars
        </Text>

        <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Subscribed Calendars</Text>
        <CalendarRow label="US Holidays" icon="🇺🇸" isChecked={selected.includes('US Holidays')} onPress={() => toggle('US Holidays')} />

        <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Default</Text>
        <CalendarRow label="Home" icon="🏠" isChecked={selected.includes('Home')} onPress={() => toggle('Home')} />
        <CalendarRow label="Work" icon="💼" isChecked={selected.includes('Work')} onPress={() => toggle('Work')} />
        <CalendarRow label="Calendar" icon="📅" isChecked={selected.includes('Calendar')} onPress={() => toggle('Calendar')} />

        <Text className="text-xs font-bold text-gray-900 mt-6 mb-3">Other</Text>
        <CalendarRow label="Birthdays" icon="🎉" isChecked={selected.includes('Birthdays')} onPress={() => toggle('Birthdays')} />
      </ScrollView>
    </SafeAreaView>
  );
}