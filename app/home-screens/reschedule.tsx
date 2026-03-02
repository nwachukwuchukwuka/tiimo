import RescheduleCalendarSheet from '@/components/RescheduleCalendarSheet';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { addDays, format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
type TaskItem = {
    id: string;
    title: string;
    duration: string;
    icon: any;
    iconBg: string;
    iconColor: string;
    isSelected: boolean;
};

const INITIAL_TASKS: TaskItem[] = [
    { id: '1', title: 'Start work', duration: '5m', icon: 'laptop', iconBg: 'bg-gray-100', iconColor: '#4B5563', isSelected: true },
    { id: '2', title: 'Drink water', duration: '5m', icon: 'water-outline', iconBg: 'bg-cyan-100', iconColor: '#06B6D4', isSelected: true },
    { id: '3', title: 'Plan your day', duration: '10m', icon: 'clipboard-text-outline', iconBg: 'bg-yellow-100', iconColor: '#EAB308', isSelected: true },
    { id: '4', title: 'Morning routine', duration: '30m', icon: 'weather-sunset', iconBg: 'bg-orange-100', iconColor: '#F97316', isSelected: true },
    { id: '5', title: 'Have dinner', duration: '20m', icon: 'food-turkey', iconBg: 'bg-green-100', iconColor: '#22C55E', isSelected: true },
];

export default function RescheduleScreen() {
    const router = useRouter();
    const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
    const [isReviewDone, setIsReviewDone] = useState(false);


    const calendarSheetRef = useRef<BottomSheetModal>(null);

    const selectedCount = tasks.filter(t => t.isSelected).length;
    const tomorrow = addDays(new Date(), 1);

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, isSelected: !t.isSelected } : t));
    };

    const handleOpenCalendar = () => {
        console.log('clicked')
        calendarSheetRef.current?.present();
    };

    const handleDoneReviewing = () => {
        setIsReviewDone(true);
        setTimeout(() => {
            router.back();
        }, 2000);
    };


    if (isReviewDone) {
        return (
            <View className="flex-1 bg-white">
                <LinearGradient
                    colors={['#FFFFFF', '#FFFFFF', '#C4B5FD']}
                    locations={[0, 0.4, 1]}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View className="items-center justify-center">
                        <Ionicons name="moon" size={60} color="#7C3AED" style={{ marginBottom: 24, transform: [{ rotate: '-15deg' }] }} />
                        <Text className="text-3xl font-serif text-black mb-2">Review done</Text>
                        <Text className="text-gray-900 text-center text-base px-10">
                            Everything is handled for today.{'\n'}Time to rest and recharge
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-white">
                <SafeAreaProvider>
                    <SafeAreaView className="flex-1 relative" edges={['top', 'bottom']}>

                        {/* --- Header --- */}
                        <View className="px-5 pt-2 pb-4">
                            <View className="flex-row justify-between items-start">
                                <View className="bg-purple-100 px-3 py-1.5 rounded-full self-start mb-3">
                                    <Text className="text-purple-800 font-bold text-xs">{format(new Date(), 'EEEE, MMM d')}</Text>
                                </View>
                                <TouchableOpacity onPress={() => router.back()} className="p-1 bg-gray-100 rounded-full">
                                    <Ionicons name="close" size={20} color="gray" />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-3xl font-bold text-black mb-2">Remaining tasks</Text>
                            <Text className="text-gray-500 text-base leading-5">
                                These are the remaining tasks. Anything you want to move to another day?
                            </Text>
                        </View>

                        {/* --- Task List --- */}
                        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                            <Text className="text-lg font-bold text-black mb-4 mt-2">
                                Move {selectedCount} to tomorrow?
                            </Text>

                            {tasks.map((task) => (
                                <View key={task.id} className="flex-row items-center mb-4 gap-4">
                                    {/* Checkbox */}
                                    <TouchableOpacity onPress={() => toggleTask(task.id)}>
                                        {task.isSelected ? (
                                            <Ionicons name="checkmark-circle" size={28} color="black" />
                                        ) : (
                                            <Ionicons name="ellipse-outline" size={28} color="#D1D5DB" />
                                        )}
                                    </TouchableOpacity>

                                    {/* Card */}
                                    <View className="flex-1 flex-row items-center p-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${task.iconBg}`}>
                                            {/* @ts-ignore */}
                                            <MaterialCommunityIcons name={task.icon} size={20} color={task.iconColor} />
                                        </View>
                                        <View>
                                            <Text className="text-base font-bold text-gray-900">{task.title}</Text>
                                            <Text className="text-xs text-gray-400 font-medium">{task.duration}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                            <View className="h-32" />
                        </ScrollView>

                        {/* --- Footer Actions --- */}
                        <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-8 border-t border-gray-100 shadow-lg">
                            {/* Primary Action */}
                            <TouchableOpacity
                                className="w-full bg-[#1C1C1E] py-4 rounded-full items-center mb-3"
                                onPress={() => router.back()}
                            >
                                <Text className="text-white font-bold text-base">
                                    Move to tomorrow ({selectedCount})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="w-full bg-white border border-gray-300 py-4 rounded-full items-center mb-4"
                                onPress={handleOpenCalendar}
                            >
                                <Text className="text-black font-bold text-base">
                                    More options to move ({selectedCount})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleDoneReviewing}>
                                <Text className="text-center text-gray-500 font-bold underline decoration-gray-400">
                                    I'm done reviewing
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <RescheduleCalendarSheet
                            ref={calendarSheetRef}
                            count={selectedCount}
                            onSelectDate={(date) => {
                                calendarSheetRef.current?.dismiss();
                            }}
                        />

                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </BottomSheetModalProvider>

    );
}