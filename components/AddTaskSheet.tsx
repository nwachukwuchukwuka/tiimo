import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';

export interface AddTaskSheetProps {
    onAddTask: (title: string, priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'TODO', duration: string) => void;
    onOpenDetails: (currentText: string) => void;
}

const AddTaskSheet = forwardRef<BottomSheetModal, AddTaskSheetProps>(({ onAddTask, onOpenDetails }, ref) => {
    const { dismiss } = useBottomSheetModal();
    const [text, setText] = useState('');

    const snapPoints = useMemo(() => ['18%'], []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAddTask(text, 'TODO', '15M');
        setText('');
        Keyboard.dismiss();
        (ref as any)?.current?.dismiss();
    };

    const handleEllipsisClick = () => {
        Keyboard.dismiss();
        (ref as any)?.current?.dismiss();
        onOpenDetails(text);
        setText('');
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            backgroundStyle={{ borderRadius: 32 }}
        >
            <BottomSheetView className="flex-1 px-6 pt-2 pb-8">

                {/* Input Area */}
                <View className="flex-row items-center justify-between mb-6">
                    <BottomSheetTextInput
                        className="flex-1 text-2xl font-serif text-[#1C1C1E] mr-4"
                        placeholder="Type to begin"
                        placeholderTextColor="#A1A1AA"
                        value={text}
                        onChangeText={setText}
                        autoFocus={true}
                    />

                    {text.length > 0 && (
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                            <Text>🧺</Text>
                        </View>
                    )}
                </View>

                {/* Action Row */}
                <View className="flex-row items-center justify-between">

                    {/* Chips */}
                    <View className="flex-row gap-2">
                        <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-xl flex-row items-center gap-1">
                            <Text className="text-xs font-bold text-gray-600 uppercase">TO-DO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-xl flex-row items-center gap-1">
                            <Text className="text-xs font-bold text-gray-600">15M</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleEllipsisClick}
                            className="bg-gray-100 w-8 h-8 rounded-xl items-center justify-center"
                        >
                            <Ionicons name="ellipsis-horizontal" size={16} color="#4B5563" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={text.length > 0 ? handleSubmit : () => { }}
                        className={`flex-row items-center px-4 py-2.5 rounded-full gap-2 ${text.length > 0 ? 'bg-black' : 'bg-[#1C1C1E]'}`}
                    >
                        {text.length > 0 ? (
                            <Ionicons name="arrow-up" size={18} color="white" />
                        ) : (
                            <>
                                <Ionicons name="mic" size={18} color="white" />
                                <Text className="text-white font-bold text-xs">Speak</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default AddTaskSheet;