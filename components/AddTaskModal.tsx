import { DEFAULT_TAGS, TagItem, Task } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ChooseVisualsModal from './add-task/ChooseVisualsModal';
import DatePicker from './add-task/DatePicker';
import DurationPicker from './add-task/DurationPicker';
import SubtaskList from './add-task/SubtaskList';
import TagCreateSheet from './add-task/TagCreateSheet';
import TagEditSheet from './add-task/TagEditSheet';
import TagList from './add-task/TagList';
import TagManagerSheet from './add-task/TagManagerSheet';
import TimeOfDaySelector from './add-task/TimeOfDaySelector';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    initialTask?: Task | null;
    mode?: 'add' | 'edit' | 'copy';

};

const DEFAULT_TASK: Task = {
    id: '', title: '', duration: '1h 30m', icon: '✨', iconBg: '#F3F4F6', iconColor: '#000', isCompleted: false, originalSection: 'morning', subTasks: []
};

export default function AddTaskModal({ visible, onClose, onSave, initialTask, mode = 'add' }: Props) {
    const [taskData, setTaskData] = useState<Task>(DEFAULT_TASK);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hour, setHour] = useState(1);
    const [min, setMin] = useState(30);
    const [showVisualsModal, setShowVisualsModal] = useState(false);

    // --- TAG STATE MANAGEMENT ---
    const [allTags, setAllTags] = useState<TagItem[]>(DEFAULT_TAGS);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tagManagerRef = useRef<BottomSheetModal>(null);
    const tagEditRef = useRef<BottomSheetModal>(null);
    const tagCreateRef = useRef<BottomSheetModal>(null);

    // useEffect(() => {
    //     if (visible) {
    //         if (initialTask) {
    //             setTaskData(initialTask);

    //         } else {
    //             setTaskData({ ...DEFAULT_TASK, id: `new-${Date.now()}` });
    //             setSelectedDate(new Date());
    //             setSelectedTags([]);
    //             setHour(1);
    //             setMin(30);
    //         }
    //     }
    // }, [visible, initialTask]);
    useEffect(() => {
        if (visible) {
            if (mode === 'edit' && initialTask) {
                // EDIT: Load exact task data
                setTaskData(initialTask);
            } else if (mode === 'copy' && initialTask) {
                // COPY: Load data but generate new ID and append (Copy) to title if desired
                setTaskData({
                    ...initialTask,
                    id: `new-${Date.now()}`, // Force new ID
                    // Optional: Auto-append (Copy) if not handled by parent
                    title: initialTask.title.includes('(Copy)') ? initialTask.title : `${initialTask.title} (Copy)`
                });
            } else {
                // ADD: Reset to defaults
                setTaskData({ ...DEFAULT_TASK, id: `new-${Date.now()}` });
                setSelectedDate(new Date());
                setSelectedTags([]);
                setHour(1);
                setMin(30);
            }
        }
    }, [visible, initialTask, mode]);

    const handleSave = () => {
        if (!taskData.title.trim()) return;
        const finalTask = { ...taskData, duration: `${hour}h ${min}m` };
        onSave(finalTask);
    };

    const handleVisualsUpdate = (visuals: { bg: string; icon: string }) => {
        setTaskData(prev => ({ ...prev, iconBg: visuals.bg, icon: visuals.icon as any }));
    };

    // --- Tag Handlers ---
    const handleCreateTag = (name: string) => {
        const newTag: TagItem = {
            id: `custom-${Date.now()}`,
            label: name,
            icon: 'tag-outline',
            bg: '#F3F4F6',
            color: '#374151'
        };
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAllTags(prev => [...prev, newTag]);
        setSelectedTags(prev => [...prev, newTag.id]);
        setTimeout(() => tagManagerRef.current?.present(), 300);
    };

    const handleDeleteTag = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAllTags(prev => prev.filter(t => t.id !== id));
        setSelectedTags(prev => prev.filter(tid => tid !== id));
    };

    const handleToggleTag = (id: string) => {
        setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    };

    const handleOpenEdit = () => {
        tagManagerRef.current?.dismiss();
        setTimeout(() => tagEditRef.current?.present(), 200);
    };

    const handleOpenCreate = () => {
        tagManagerRef.current?.dismiss();
        setTimeout(() => tagCreateRef.current?.present(), 200);
    };

    const getModalTitle = () => {
        if (mode === 'edit') return 'Edit task';
        if (mode === 'copy') return 'Copy task';
        return 'Add task';
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <MenuProvider>
                    <BottomSheetModalProvider>
                        <SafeAreaProvider>
                            <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'bottom']}>
                                {/* Header */}
                                <View className="flex-row items-center justify-between p-4 z-10">
                                    <TouchableOpacity onPress={onClose} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-200">
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                    {/* <Text className="text-lg font-bold text-[#1C1C1E]">{initialTask ? 'Edit task' : 'Add task'}</Text> */}
                                    <Text className="text-lg font-bold text-[#1C1C1E]">
                                        {getModalTitle()}
                                    </Text>
                                    <TouchableOpacity onPress={handleSave} className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center">
                                        <Ionicons name="checkmark" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 130 }} keyboardShouldPersistTaps="handled">
                                    {/* Task Name & Icon */}
                                    <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-50 flex-row items-center justify-between">
                                        <TextInput
                                            value={taskData.title}
                                            onChangeText={(text) => setTaskData(prev => ({ ...prev, title: text }))}
                                            placeholder="Plan your day"
                                            className="text-lg font-medium text-[#1C1C1E] flex-1 mr-4"
                                            autoFocus={!initialTask}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowVisualsModal(true)}
                                            className="w-10 h-10 rounded-full items-center justify-center border border-gray-100"
                                            style={{ backgroundColor: taskData.iconBg }}
                                        >
                                            <Text style={{ fontSize: 20 }}>{taskData.icon}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Details */}
                                    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 z-50">
                                        <TimeOfDaySelector currentSection={taskData.originalSection} onSelect={(s) => setTaskData(prev => ({ ...prev, originalSection: s as any }))} />
                                        <DatePicker date={selectedDate} onSelect={setSelectedDate} />
                                        <DurationPicker hour={hour} min={min} onHourChange={setHour} onMinChange={setMin} />
                                        <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                                            <Text className="text-base text-gray-500">Repeat</Text>
                                            <View className="flex-row items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"><MaterialCommunityIcons name="repeat" size={16} color="#1C1C1E" /><Text className="font-medium text-sm text-[#1C1C1E]">No repeat</Text></View>
                                        </View>
                                    </View>

                                    <SubtaskList />

                                    <View className="bg-white rounded-2xl p-4 h-32 -z-10 shadow-sm border border-gray-50">
                                        <TextInput placeholder="Write your notes here..." multiline className="flex-1 text-base text-[#1C1C1E]" textAlignVertical="top" placeholderTextColor="#9CA3AF" />
                                    </View>

                                    <TagList
                                        allTags={allTags}
                                        tagIds={selectedTags}
                                        onAddPress={() => tagManagerRef.current?.present()}
                                    />
                                </ScrollView>

                                <ChooseVisualsModal visible={showVisualsModal} onClose={() => setShowVisualsModal(false)} onSave={handleVisualsUpdate} initialData={{ bg: taskData.iconBg, icon: taskData.icon as string, type: 'color' }} />


                                <TagManagerSheet
                                    ref={tagManagerRef}
                                    tags={allTags}
                                    selectedTags={selectedTags}
                                    onToggleTag={handleToggleTag}
                                    onOpenEdit={handleOpenEdit}
                                    onOpenCreate={handleOpenCreate}
                                />

                                <TagEditSheet
                                    ref={tagEditRef}
                                    tags={allTags}
                                    onReorder={setAllTags}
                                    onDelete={handleDeleteTag}
                                />

                                <TagCreateSheet
                                    ref={tagCreateRef}
                                    onCreate={handleCreateTag}
                                />

                            </SafeAreaView>
                        </SafeAreaProvider>
                    </BottomSheetModalProvider>
                </MenuProvider>
            </GestureHandlerRootView>
        </Modal>
    );
}