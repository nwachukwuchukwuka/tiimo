import { Ionicons } from '@expo/vector-icons';
import { addDays, addWeeks, format, isSameDay, startOfWeek, subWeeks } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
};

export default function WeeklyCalendar({ selectedDate, onSelectDate }: Props) {
    const [currentWeekStart, setCurrentWeekStart] = useState(
        startOfWeek(selectedDate, { weekStartsOn: 0 })
    );

    useEffect(() => {
        setCurrentWeekStart(startOfWeek(selectedDate, { weekStartsOn: 0 }));
    }, [selectedDate]);

    const changeWeek = (direction: 'prev' | 'next') => {
        setCurrentWeekStart(prev =>
            direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1)
        );
    };

    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

    return (
        <View className="py-4">
            <View className="flex-row items-center justify-between">

                <TouchableOpacity onPress={() => changeWeek('prev')} className="">
                    <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
                </TouchableOpacity>

                <View className="flex-row gap-4">
                    {weekDays.map((date) => {
                        const isSelected = isSameDay(date, selectedDate);

                        return (
                            <TouchableOpacity
                                key={date.toISOString()}
                                onPress={() => onSelectDate(date)}
                                className="items-center gap-1"
                            >
                                {/* Date Circle */}
                                <View
                                    className={`w-10 h-10 rounded-full items-center justify-center ${isSelected ? "bg-[#1C1C1E]" : "bg-[#F2F2F7]"
                                        }`}
                                >
                                    <Text
                                        className={`text-base font-bold ${isSelected ? "text-white" : "text-[#1C1C1E]"
                                            }`}
                                    >
                                        {format(date, 'd')}
                                    </Text>
                                </View>

                                {/* Day Name */}
                                <Text
                                    className={`text-[10px] font-bold uppercase ${isSelected ? "text-black" : "text-black"
                                        }`}
                                >
                                    {format(date, 'EEE')}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity onPress={() => changeWeek('next')} className="">
                    <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
                </TouchableOpacity>

            </View>
        </View>
    );
}