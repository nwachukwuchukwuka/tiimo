import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LayoutAnimation, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

// --- Types ---
type SubTaskItem = {
    id: string;
    title: string;
    icon: string;
    color: string;
    iconColor: string;
};

const DEFAULT_SUBTASKS: SubTaskItem[] = [
    { id: 'st1', title: 'Wake up and stretch', icon: 'human-handsup', color: '#E0E7FF', iconColor: '#4338CA' },
    { id: 'st2', title: 'Drink a glass of water', icon: 'water-outline', color: '#DCFCE7', iconColor: '#15803D' },
    { id: 'st3', title: 'Go for a morning walk', icon: 'walk', color: '#F3E8FF', iconColor: '#7E22CE' },
];

export default function SubtaskList() {
    const [subtasks, setSubtasks] = useState<SubTaskItem[]>(DEFAULT_SUBTASKS);
    const [isAdding, setIsAdding] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    // --- Drag & Drop Handler ---
    const renderItem = ({ item, drag, isActive }: RenderItemParams<SubTaskItem>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    activeOpacity={1}
                    className={`flex-row items-center justify-between p-3 border-b border-gray-50 ${isActive ? 'bg-gray-50  z-10' : 'bg-white'}`}
                >
                    <View className="flex-row items-center gap-3 flex-1">
                        <View style={{ backgroundColor: item.color }} className="w-10 h-10 rounded-full items-center justify-center">
                            {/* @ts-ignore */}
                            <MaterialCommunityIcons name={item.icon} size={20} color={item.iconColor} />
                        </View>
                        <Text className="text-base font-bold text-[#1C1C1E]">{item.title}</Text>
                    </View>

                    {/* Drag Handle */}
                    <TouchableOpacity onPressIn={drag} className="p-2">
                        <MaterialCommunityIcons name="dots-grid" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    const handleAddClick = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsAdding(true);
    };

    const handleCancelAdd = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsAdding(false);
        setNewSubtaskTitle('');
    };

    const handleSaveSubtask = () => {
        if (newSubtaskTitle.trim() === '') {
            handleCancelAdd();
            return;
        }

        const newTask: SubTaskItem = {
            id: `new-${Date.now()}`,
            title: newSubtaskTitle,
            icon: 'checkbox-blank-circle-outline',
            color: '#F3F4F6',
            iconColor: '#9CA3AF'
        };

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSubtasks([...subtasks, newTask]);
        setNewSubtaskTitle('');
        setIsAdding(false);
    };

    return (
        <View className="mt-6 mb-4">
            <Text className="text-base text-gray-500 mb-2">Sub-tasks</Text>

            <View className="bg-white rounded-2xl p-2  border border-gray-50 overflow-hidden">

                {/* Draggable List */}
                <DraggableFlatList
                    data={subtasks}
                    onDragEnd={({ data }) => setSubtasks(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

                {isAdding ? (
                    <View className="flex-row items-center justify-between p-2 mt-1 border border-gray-200 rounded-xl bg-white">
                        <View className="flex-row items-center flex-1 gap-3">
                            <View className="w-8 h-8 rounded-full bg-pink-50 items-center justify-center">
                                <View className="w-4 h-4 rounded-full bg-pink-100" />
                            </View>

                            <TextInput
                                autoFocus
                                placeholder="Subtask"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 text-base text-black font-medium"
                                value={newSubtaskTitle}
                                onChangeText={setNewSubtaskTitle}
                                onSubmitEditing={handleSaveSubtask}
                                returnKeyType="done"
                            />
                        </View>

                        <TouchableOpacity onPress={handleCancelAdd} className="p-2">
                            <Ionicons name="trash-outline" size={20} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    /* --- ADD NEW BUTTON --- */
                    <TouchableOpacity
                        onPress={handleAddClick}
                        className="flex-row justify-center items-center py-4 mt-1"
                    >
                        <Text className="text-xs font-bold text-gray-400 tracking-widest">ADD NEW</Text>
                        <View className="bg-gray-100 rounded-full p-1 ml-2">
                            <Ionicons name="add" size={14} color="#9CA3AF" />
                        </View>
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
}