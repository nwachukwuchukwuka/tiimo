import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

type Props = {
    onCreate: (name: string) => void;
};

const TagCreateSheet = forwardRef<BottomSheetModal, Props>(({ onCreate }, ref) => {
    const snapPoints = useMemo(() => ['15%'], []); 
    const [text, setText] = useState('');

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
        []
    );

    const handleSubmit = () => {
        if (text.trim()) {
            onCreate(text);
            setText('');
            (ref as any).current?.dismiss();
        }
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ borderRadius: 24 }}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-4 pt-4">
                <View className="bg-gray-100 rounded-xl flex-row items-center px-3 py-1">
                    <BottomSheetTextInput
                        placeholder="Tag"
                        className="flex-1 text-lg py-2"
                        value={text}
                        onChangeText={setText}
                        autoFocus
                        onSubmitEditing={handleSubmit}
                    />
                    <TouchableOpacity onPress={handleSubmit} className="bg-gray-300 w-8 h-8 rounded-full items-center justify-center">
                        <Ionicons name="arrow-up" size={18} color="black" />
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default TagCreateSheet;