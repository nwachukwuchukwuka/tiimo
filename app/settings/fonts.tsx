import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FontCard = ({ name, preview, isSelected, onPress }: any) => (
    <TouchableOpacity 
        onPress={onPress}
        className={`bg-white border-2 ${isSelected ? 'border-black' : 'border-gray-200'} rounded-2xl p-5 mb-4`}
    >
        <View className="flex-row justify-between items-start">
            <View>
                <Text className="text-xs font-bold text-[#1C1C1E] mb-2">{name}</Text>
                {/* Dynamically styling text to simulate font change */}
                <Text style={{ fontSize: 32, fontWeight: '800', fontFamily: name === 'OpenDyslexic' ? 'serif' : 'sans-serif' }}>
                    {preview}
                </Text>
            </View>
            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-black' : 'border-gray-300'}`}>
                {isSelected && <View className="w-3 h-3 bg-black rounded-full" />}
            </View>
        </View>
    </TouchableOpacity>
);

export default function FontScreen() {
  const router = useRouter();
  const [selectedFont, setSelectedFont] = useState('Default');
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleSelect = (font: string) => {
      if (font !== selectedFont) {
          setSelectedFont(font);
          setShowRestartModal(true);
      }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      {/* Header */}
      <View className="px-6 pt-2 pb-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#1C1C1E]">Fonts</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
          <FontCard 
            name="Default" 
            preview="Abcde" 
            isSelected={selectedFont === 'Default'} 
            onPress={() => handleSelect('Default')} 
          />
          <FontCard 
            name="OpenDyslexic" 
            preview="Abcde" 
            isSelected={selectedFont === 'OpenDyslexic'} 
            onPress={() => handleSelect('OpenDyslexic')} 
          />
      </ScrollView>

      {/* Info Footer */}
      <View className="px-6 py-6 flex-row items-center gap-2">
          <Ionicons name="information-circle-outline" size={20} color="#1C1C1E" />
          <Text className="flex-1 text-xs text-[#1C1C1E] leading-4">
              Changing the font type requires you to restart Tiimo to apply the new settings.
          </Text>
      </View>

      {/* Restart Modal */}
      <Modal visible={showRestartModal} transparent animationType="fade">
          <View className="flex-1 bg-black/60 items-center justify-center px-6">
              <View className="bg-white w-full rounded-3xl p-6 items-center">
                  <Text className="text-xl font-serif text-[#1C1C1E] mb-4">Restart needed</Text>
                  <Text className="text-center text-gray-600 mb-8 leading-6">
                      You need to restart Tiimo in order for the selected font to take effect. Only you can do this so we're counting on you.
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={() => setShowRestartModal(false)}
                    className="w-full bg-[#1C1C1E] py-4 rounded-full items-center mb-3"
                  >
                      <Text className="text-white font-bold">Confirm</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setShowRestartModal(false)}>
                      <Text className="text-[#1C1C1E] font-bold underline">Cancel</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

    </SafeAreaView>
  );
}