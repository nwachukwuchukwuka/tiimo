// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const SettingsRow = ({ icon, label, value, onPress, isDestructive = false }: any) => (
//   <TouchableOpacity 
//     onPress={onPress}
//     activeOpacity={0.7}
//     className="flex-row items-center justify-between py-4 bg-transparent"
//   >
//     <View className="flex-row items-center gap-4">
//       <Ionicons name={icon} size={24} color={isDestructive ? '#EF4444' : '#1C1C1E'} />
//       <Text className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-[#1C1C1E]'}`}>
//         {label}
//       </Text>
//     </View>
//     <View className="flex-row items-center gap-2">
//       {value && <Text className="text-gray-400 text-sm">{value}</Text>}
//       <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
//     </View>
//   </TouchableOpacity>
// );

// const SectionHeader = ({ title }: { title: string }) => (
//   <Text className="text-sm font-bold text-[#1C1C1E] mt-8 mb-2">{title}</Text>
// );

// export default function SettingsScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
//       {/* Header */}
//       <View className="px-6 pt-2 pb-4">
//         <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mb-4">
//             <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
//         </TouchableOpacity>
//         <Text className="text-4xl font-serif text-[#1C1C1E]">Settings</Text>
//       </View>

//       <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        
//         <SectionHeader title="Settings" />
//         <SettingsRow icon="notifications-outline" label="Notifications" onPress={() => router.push('/settings/notifications')} />
//         <SettingsRow icon="calendar-outline" label="Calendar import" onPress={() => router.push('/settings/calendar')} />
//         <SettingsRow icon="list-outline" label="Reminder import" onPress={() => router.push('/settings/reminders')} />
//         <SettingsRow icon="color-palette-outline" label="Theme" onPress={() => router.push('/settings/theme')} />
//         <SettingsRow icon="sunny-outline" label="Appearance" value="System" onPress={() => {}} />
//         <SettingsRow icon="text-outline" label="Fonts" onPress={() => router.push('/settings/fonts')} />
//         <SettingsRow icon="musical-note-outline" label="Sounds" onPress={() => {}} />
//         <SettingsRow icon="happy-outline" label="App icon" onPress={() => {}} />

//         <SectionHeader title="Profile" />
//         <SettingsRow icon="person-add-outline" label="Add new profile" onPress={() => {}} />
//         <SettingsRow icon="person-outline" label="Edit profile name" onPress={() => {}} />

//         <SectionHeader title="Account & subscription" />
//         <SettingsRow icon="refresh-outline" label="Restore purchase" onPress={() => {}} />
//         <SettingsRow icon="pricetag-outline" label="Redeem offer code" onPress={() => {}} />
//         <SettingsRow icon="chatbubble-outline" label="Email settings" onPress={() => {}} />
//         <SettingsRow icon="trash-outline" label="Delete account" onPress={() => {}} />
//         <SettingsRow icon="mail-outline" label="Change email address" onPress={() => {}} />
//         <SettingsRow icon="log-out-outline" label="Sign out" onPress={() => {}} />

//         <SectionHeader title="Other" />
//         <SettingsRow icon="document-text-outline" label="Privacy Policy" onPress={() => {}} />
//         <SettingsRow icon="help-circle-outline" label="Terms of service" onPress={() => {}} />

//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import our new modals
import { AddProfileSheet, DeleteAccountModal, DeleteProfileSheet } from '@/components/SettingsModals';

// Reusable Row Component
const SettingsRow = ({ icon, label, value, onPress, isDestructive = false }: any) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="flex-row items-center justify-between py-4 bg-transparent">
    <View className="flex-row items-center gap-4">
      <Ionicons name={icon} size={24} color={isDestructive ? '#EF4444' : '#1C1C1E'} />
      <Text className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-[#1C1C1E]'}`}>{label}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      {value && <Text className="text-gray-400 text-sm">{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-sm font-bold text-[#1C1C1E] mt-8 mb-2">{title}</Text>
);

export default function SettingsScreen() {
  const router = useRouter();
  
  // Refs for Bottom Sheets
  const addProfileRef = useRef<BottomSheetModal>(null);
  const deleteProfileRef = useRef<BottomSheetModal>(null);
  
  // State for Modals & Notifications
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showProfileAdded, setShowProfileAdded] = useState(false);

  // Handlers
  const handleAddProfile = (name: string) => {
      // Simulate API call
      setShowProfileAdded(true);
      setTimeout(() => setShowProfileAdded(false), 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      
      {/* Top Notification Toast (Profile Added) */}
      {showProfileAdded && (
          <Animated.View 
            entering={FadeInDown} 
            exiting={FadeOutUp}
            className="absolute top-12 left-0 right-0 z-50 items-center"
          >
              <View className="bg-[#8B7EFF] px-6 py-3 rounded-full shadow-lg">
                  <Text className="text-white font-bold text-sm">Profile added</Text>
              </View>
          </Animated.View>
      )}

      {/* Header */}
      <View className="px-6 pt-2 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mb-4">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-4xl font-serif text-[#1C1C1E]">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        
        <SectionHeader title="Settings" />
        <SettingsRow icon="notifications-outline" label="Notifications" onPress={() => router.push('/settings/notifications')} />
        <SettingsRow icon="calendar-outline" label="Calendar import" onPress={() => router.push('/settings/calendar')} />
        <SettingsRow icon="list-outline" label="Reminder import" onPress={() => router.push('/settings/reminders')} />
        <SettingsRow icon="color-palette-outline" label="Theme" onPress={() => router.push('/settings/theme')} />
        <SettingsRow icon="text-outline" label="Fonts" onPress={() => router.push('/settings/fonts')} />
        <SettingsRow icon="happy-outline" label="App icon" onPress={() => router.push('/settings/app-icon')} />

        <SectionHeader title="Profile" />
        {/* Trigger Add Profile Sheet */}
        <SettingsRow 
            icon="person-add-outline" 
            label="Add new profile" 
            onPress={() => addProfileRef.current?.present()} 
        />
        <SettingsRow icon="person-outline" label="Edit profile name" onPress={() => {}} />
        {/* Trigger Delete Profile Sheet (Added for demo purposes based on screenshot flow) */}
        <SettingsRow 
            icon="close-circle-outline" 
            label="Delete profile" 
            onPress={() => deleteProfileRef.current?.present()} 
        />

        <SectionHeader title="Account & subscription" />
        <SettingsRow icon="refresh-outline" label="Restore purchase" onPress={() => {}} />
        <SettingsRow icon="pricetag-outline" label="Redeem offer code" onPress={() => {}} />
        <SettingsRow icon="chatbubble-outline" label="Email settings" onPress={() => {}} />
        
        {/* Trigger Delete Account Modal */}
        <SettingsRow 
            icon="trash-outline" 
            label="Delete account" 
            onPress={() => setShowDeleteAccount(true)} 
        />
        <SettingsRow icon="mail-outline" label="Change email address" onPress={() => {}} />
        <SettingsRow icon="log-out-outline" label="Sign out" onPress={() => {}} />

        <SectionHeader title="Other" />
        <SettingsRow icon="document-text-outline" label="Privacy Policy" onPress={() => {}} />
        <SettingsRow icon="help-circle-outline" label="Terms of service" onPress={() => {}} />

      </ScrollView>

      {/* --- Modals --- */}
      <AddProfileSheet ref={addProfileRef} onAdd={handleAddProfile} />
      <DeleteProfileSheet ref={deleteProfileRef} onDelete={() => {}} />
      <DeleteAccountModal visible={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />

    </SafeAreaView>
  );
}