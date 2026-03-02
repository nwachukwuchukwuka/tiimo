import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export const AddProfileSheet = forwardRef<BottomSheetModal, { onAdd: (name: string) => void }>(({ onAdd }, ref) => {
  const [name, setName] = useState('');
  
  const handleAdd = () => {
      onAdd(name);
      setName('');
      (ref as any).current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['20%']}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />}
      backgroundStyle={{ borderRadius: 32 }}
    >
      <BottomSheetView className="flex-1 px-6 pt-4">
        <Text className="text-xl font-bold text-[#1C1C1E] mb-6">Add new profile</Text>
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-1 mb-4">
            <BottomSheetTextInput 
                placeholder="Name"
                placeholderTextColor="#9CA3AF"
                style={{ flex: 1, paddingVertical: 16, fontSize: 16, color: '#1C1C1E' }}
                value={name}
                onChangeText={setName}
                autoFocus
            />
            {name.length > 0 && (
                <TouchableOpacity onPress={handleAdd} className="w-8 h-8 bg-black rounded-full items-center justify-center">
                    <Ionicons name="arrow-up" size={18} color="white" />
                </TouchableOpacity>
            )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export const DeleteProfileSheet = forwardRef<BottomSheetModal, { onDelete: () => void }>(({ onDelete }, ref) => {
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['45%']}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />}
      backgroundStyle={{ borderRadius: 32 }}
      enableDynamicSizing={false}
    >
      <BottomSheetView className="flex-1 px-6 pt-2 items-center">
        <Text className="text-2xl font-serif text-center text-[#1C1C1E] mb-2 leading-8">
            Are you sure you want to delete the profile "Sam Lee"
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-8 px-4">
            If you delete the profile, all tasks inside the profile will also be deleted. This can't be undone.
        </Text>

        <TouchableOpacity 
            onPress={() => { onDelete(); (ref as any).current?.dismiss(); }}
            className="w-full bg-[#1C1C1E] py-4 rounded-full items-center mb-3"
        >
            <Text className="text-white font-bold text-base">Yes, delete</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => (ref as any).current?.dismiss()}
            className="w-full bg-[#E5E5EA] py-4 rounded-full items-center"
        >
            <Text className="text-[#1C1C1E] font-bold text-base">No, cancel</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export const DeleteAccountModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/40 items-center justify-center px-8">
                <View className="bg-[#E9E9EA] w-full rounded-2xl overflow-hidden">
                    <View className="p-6 items-center border-b border-gray-300/50">
                        <Text className="text-lg font-bold text-black mb-2 text-center">
                            Do you want to delete your account?
                        </Text>
                        <Text className="text-sm text-gray-600 text-center leading-5">
                            Your account will be permanently deleted after three days. If you log in again within the three days, your account will be recovered.
                            {'\n'}{'\n'}
                            You have to unsubscribe from Apple yourself before deleting your account, by going to the local settings on your device.
                        </Text>
                    </View>
                    <View className="flex-row h-20">
                        <TouchableOpacity 
                            onPress={onClose} 
                            className="flex-1 items-center justify-center border-r border-gray-300/50"
                        >
                            <Text className="text-[17px] font-semibold text-black">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={onClose} // Logic to delete would go here
                            className="flex-1 items-center justify-center"
                        >
                            <Text className="text-[17px] font-semibold text-[#FF3B30]">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};