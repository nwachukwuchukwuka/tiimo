import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { addDays, addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns';
import React, { forwardRef, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    count: number;
    onSelectDate: (date: Date) => void;
};

const RescheduleCalendarSheet = forwardRef<BottomSheetModal, Props>(({ count, onSelectDate }, ref) => {
    const snapPoints = useMemo(() => ['92%'], []);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 2));

    // Calendar Logic
    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth)),
    });

    const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 bg-[#F9FAFB]">


                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 300 }}
                    contentContainerStyle={{ paddingBottom: 8 }}
                >
                    <View className="px-6 pt-2 pb-4 border-b border-gray-100">
                        <Text className="text-xl font-bold text-black mb-1">Move ({count})</Text>
                        <Text className="text-gray-500 text-sm">When do you want to move this to?</Text>
                    </View>

                    {/* Task Previews */}
                    <View className="px-4 py-4">
                        <View className="bg-white p-3 rounded-2xl mb-2 flex-row items-center border border-gray-100">
                            <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-3">
                                <MaterialCommunityIcons name="weather-sunset" size={16} color="#F97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-sm">Morning routine</Text>
                                <Text className="text-gray-400 text-xs">30m</Text>
                            </View>
                            <Ionicons name="chevron-down" size={16} color="gray" />
                        </View>

                        <View className="bg-white p-3 rounded-2xl flex-row items-center border border-gray-100 opacity-50">
                            <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-3">
                                <MaterialCommunityIcons name="food-turkey" size={16} color="#22C55E" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-sm">Have dinner</Text>
                                <Text className="text-gray-400 text-xs">20m</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Calendar Section */}
                <View className="flex-1 px-6 pt-6">
                    {/* Month Nav */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-bold text-black">
                            {format(currentMonth, 'MMMM yyyy')} <Ionicons name="chevron-forward" size={16} />
                        </Text>
                        <View className="flex-row gap-6">
                            <TouchableOpacity onPress={prevMonth}><Ionicons name="chevron-back" size={24} color="#9CA3AF" /></TouchableOpacity>
                            <TouchableOpacity onPress={nextMonth}><Ionicons name="chevron-forward" size={24} color="black" /></TouchableOpacity>
                        </View>
                    </View>

                    {/* Week Headers */}
                    <View className="flex-row justify-between mb-2">
                        {weeks.map(day => (
                            <Text key={day} className="text-xs font-bold text-gray-300 w-10 text-center">{day}</Text>
                        ))}
                    </View>

                    {/* Days Grid */}
                    <View className="flex-row flex-wrap justify-between">
                        {days.map((day, idx) => {
                            const isSelected = isSameDay(day, selectedDate);
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isTodayDate = isToday(day);

                            return (
                                <TouchableOpacity
                                    key={day.toISOString()}
                                    onPress={() => setSelectedDate(day)}
                                    className="w-[14%] aspect-square items-center justify-center mb-2"
                                >
                                    <View className={`w-10 h-10 items-center justify-center rounded-full ${isSelected ? 'bg-gray-200' : ''}`}>
                                        <Text className={`text-base ${isSelected ? 'font-bold text-black' : 'text-gray-500'} ${!isCurrentMonth ? 'opacity-20' : ''} ${isTodayDate && !isSelected ? 'text-purple-600 font-bold' : ''}`}>
                                            {format(day, 'd')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Footer Button */}
                    <View className="">
                        <TouchableOpacity
                            className="bg-[#1C1C1E] py-4 rounded-full items-center"
                            onPress={() => onSelectDate(selectedDate)}
                        >
                            <Text className="text-white font-bold text-base">
                                Move ({count}) to {format(selectedDate, 'EEEE, MMM d')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default RescheduleCalendarSheet;