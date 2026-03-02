import { TagItem } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    tags: TagItem[];
    selectedTags: string[];
    onToggleTag: (tagId: string) => void;
    onOpenEdit: () => void;
    onOpenCreate: () => void;
};

const TagManagerSheet = forwardRef<BottomSheetModal, Props>(({ tags, selectedTags, onToggleTag, onOpenEdit, onOpenCreate }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ borderRadius: 24 }}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-2 pb-8">

                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center gap-1">
                        <Text className="text-lg font-bold text-black">Choose tags</Text>
                        <Ionicons name="sparkles" size={14} color="#8B5CF6" />
                    </View>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="bg-gray-200 px-4 py-1.5 rounded-full">
                        <Text className="font-bold text-xs text-gray-700">Done</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                    <View className="flex-row flex-wrap gap-2">
                        {tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag.id);
                            return (
                                <TouchableOpacity
                                    key={tag.id}
                                    onPress={() => onToggleTag(tag.id)}
                                    className={`flex-row items-center px-3 py-2 rounded-full border ${isSelected ? 'border-purple-300 bg-purple-200' : 'border-gray-200 bg-white'}`}
                                >
                                    {/* @ts-ignore */}
                                    <MaterialCommunityIcons name={tag.icon} size={14} color={isSelected ? '#4C1D95' : '#4B5563'} style={{ marginRight: 6 }} />
                                    <Text className={`text-sm font-medium ${isSelected ? 'text-purple-900 font-bold' : 'text-gray-700'}`}>
                                        {tag.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View className="absolute bottom-8 left-5 right-5 flex-row justify-between items-center">
                    <TouchableOpacity onPress={onOpenEdit} className="border border-gray-300 px-4 py-2.5 rounded-full">
                        <Text className="font-bold text-xs text-black">Edit tags</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onOpenCreate} className="border border-gray-300 px-4 py-2.5 rounded-full flex-row items-center gap-2">
                        <Text className="font-bold text-xs text-black">New tag</Text>
                        <Ionicons name="add" size={16} color="black" />
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default TagManagerSheet;