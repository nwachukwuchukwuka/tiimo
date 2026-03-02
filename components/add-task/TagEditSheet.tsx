import { TagItem } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {
    tags: TagItem[];
    onReorder: (data: TagItem[]) => void;
    onDelete: (id: string) => void;
};

const TagEditSheet = forwardRef<BottomSheetModal, Props>(({ tags, onReorder, onDelete }, ref) => {
    const snapPoints = useMemo(() => ['90%'], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
        []
    );

    const renderItem = ({ item, drag, isActive }: RenderItemParams<TagItem>) => {
        return (
            <ScaleDecorator>
                <View className="flex-row items-center justify-between mb-4 px-1">
                    <View style={{ backgroundColor: item.bg }} className="flex-row items-center px-3 py-2 rounded-full flex-1 mr-4">
                        {/* @ts-ignore */}
                        <MaterialCommunityIcons name={item.icon} size={14} color={item.color} />
                        <Text style={{ color: item.color }} className="ml-2 font-bold text-sm">{item.label}</Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                            onPress={() => onDelete(item.id)}
                            className="bg-red-500 px-4 py-2 rounded-full flex-row items-center gap-1"
                        >
                            <Ionicons name="trash-outline" size={16} color="white" />
                            <Text className="text-white font-bold text-xs">Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPressIn={drag} className="w-8 h-8 items-center justify-center bg-gray-100 rounded-full">
                            <MaterialCommunityIcons name="drag-vertical" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScaleDecorator>
        );
    };

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
            <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 }}>

                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-lg font-bold text-black">Edit tags</Text>
                    <TouchableOpacity
                        onPress={() => (ref as any).current?.dismiss()}
                        className="bg-gray-200 px-4 py-1.5 rounded-full"
                    >
                        <Text className="font-bold text-xs text-gray-700">Done</Text>
                    </TouchableOpacity>
                </View>

                {/* Draggable List */}
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <DraggableFlatList
                        data={tags}
                        onDragEnd={({ data }) => onReorder(data)}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        containerStyle={{ flex: 1 }}
                    />
                </GestureHandlerRootView>

            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});

export default TagEditSheet;