import WeeklyCalendar from '@/components/WeeklyCalendar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";

type Props = {
    stats: { completed: number; total: number };
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    onAddPress: () => void;
};

export default function TodayHeader({ stats, selectedDate, setSelectedDate, onAddPress }: Props) {
    const router = useRouter();
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isLayoutExpanded, setLayoutExpanded] = useState(false);
    const [layoutMode, setLayoutMode] = useState<'compact' | 'timeline'>('compact');

    const toggleCalendar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCalendarVisible(!isCalendarVisible);
    };

    return (
        <View className="py-2">
            <View className="flex-row justify-between items-center mb-6 px-5">
                <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 gap-2">
                    <MaterialCommunityIcons name="party-popper" size={16} color="black" />
                    <Text className="text-xs font-bold">{stats.completed} / {stats.total}</Text>
                </View>
                <View className="flex-row gap-3">
                    <Menu>
                        <MenuTrigger>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
                                <Ionicons name="ellipsis-horizontal" size={20} color="black" />
                            </View>
                        </MenuTrigger>
                        <MenuOptions customStyles={{
                            optionsContainer: {
                                borderRadius: 20,
                                width: 240,
                                marginTop: 40,
                                paddingVertical: 8,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 10,
                                elevation: 5,
                            }
                        }}>
                            <MenuOption onSelect={() => router.push('/home-screens/reschedule')} style={{ padding: 12 }}>
                                <View className="flex-row items-center gap-3">
                                    <MaterialCommunityIcons name="calendar-clock" size={20} color="black" />
                                    <Text className="text-base font-medium text-black">Reschedule tasks</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => router.push('/home-screens/explore')} style={{ padding: 12 }}>
                                <View className="flex-row items-center gap-3">
                                    <Ionicons name="search-outline" size={20} color="black" />
                                    <Text className="text-base font-medium text-black">Explore routines</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => { }} style={{ padding: 12 }}>
                                <View className="flex-row items-center gap-3">
                                    <Ionicons name="heart-circle-outline" size={22} color="black" />
                                    <Text className="text-base font-medium text-black">Log mood</Text>
                                </View>
                            </MenuOption>

                            <View className="h-[1px] bg-gray-100 my-1 mx-3" />

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setLayoutExpanded(!isLayoutExpanded)}
                                style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Text className="text-base font-medium text-black">Layout options</Text>
                                <Ionicons name={isLayoutExpanded ? "chevron-down" : "chevron-forward"} size={18} color="gray" />
                            </TouchableOpacity>

                            {isLayoutExpanded && (
                                <View>
                                    <View className="h-[1px] bg-gray-50 mx-4 mb-2" />
                                    <MenuOption onSelect={() => setLayoutMode('compact')} style={{ paddingLeft: 20, paddingVertical: 10 }}>
                                        <View className="flex-row items-center gap-3">
                                            <View style={{ width: 20 }}>
                                                {layoutMode === 'compact' && <Ionicons name="checkmark" size={18} color="black" />}
                                            </View>
                                            <MaterialCommunityIcons name="tune-variant" size={20} color="black" />
                                            <Text className="text-base text-black">Compact</Text>
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => setLayoutMode('timeline')} style={{ paddingLeft: 20, paddingVertical: 10 }}>
                                        <View className="flex-row items-center gap-3">
                                            <View style={{ width: 20 }}>
                                                {layoutMode === 'timeline' && <Ionicons name="checkmark" size={18} color="black" />}
                                            </View>
                                            <MaterialCommunityIcons name="view-day-outline" size={20} color="black" />
                                            <Text className="text-base text-black">Timeline</Text>
                                        </View>
                                    </MenuOption>
                                </View>
                            )}
                        </MenuOptions>
                    </Menu>

                    <TouchableOpacity
                        onPress={onAddPress}
                        className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                    >
                        <Ionicons name="add" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={toggleCalendar} activeOpacity={0.7} className="items-center mt-4">
                <Text className="text-4xl text-black mb-1 text-center" style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}>
                    {format(selectedDate, 'EEEE')}
                </Text>
                <View className="flex-row items-center gap-1">
                    <Text className="text-gray-500 font-medium text-sm">{format(selectedDate, 'MMMM do, yyyy')}</Text>
                    <Ionicons name={isCalendarVisible ? "chevron-up" : "chevron-down"} size={14} color="#9CA3AF" />
                </View>
            </TouchableOpacity>

            {isCalendarVisible && (
                <View className="w-full mt-8">
                    <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                </View>
            )}
        </View>
    );
}