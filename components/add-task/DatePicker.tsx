import { Ionicons } from '@expo/vector-icons';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
    date: Date;
    onSelect: (date: Date) => void;
};

// --- Internal Calendar Component ---
const CustomCalendar = ({ selectedDate, onSelectDate, onClose }: { selectedDate: Date, onSelectDate: (date: Date) => void, onClose: () => void }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const dayIntervals = eachDayOfInterval({
        start: startOfWeek(monthStart),
        end: endOfWeek(endOfMonth(monthStart))
    });
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
        <Modal transparent animationType="fade" visible={true} onRequestClose={onClose}>
            <TouchableOpacity className="flex-1 bg-black/5 justify-center items-center px-6 " activeOpacity={1} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View className="w-80 bg-white rounded-3xl p-5 shadow-xl">
                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-5">
                            <View className="flex-row items-center gap-1">
                                <Text className="text-base font-bold text-[#1C1C1E]">{format(currentMonth, 'MMMM yyyy')}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#8B7EFF" />
                            </View>
                            <View className="flex-row gap-4">
                                <TouchableOpacity onPress={prevMonth}><Ionicons name="chevron-back" size={20} color="#1C1C1E" /></TouchableOpacity>
                                <TouchableOpacity onPress={nextMonth}><Ionicons name="chevron-forward" size={20} color="#1C1C1E" /></TouchableOpacity>
                            </View>
                        </View>

                        {/* Weekdays */}
                        <View className="flex-row justify-between mb-3">
                            {weekDays.map((d, i) => (
                                <Text key={i} className="w-10 text-center text-[10px] text-gray-400 font-bold">{d}</Text>
                            ))}
                        </View>

                        {/* Grid */}
                        <View className="flex-row flex-wrap">
                            {dayIntervals.map((dayItem, index) => {
                                const isSelected = isSameDay(dayItem, selectedDate);
                                const isCurrentMonth = isSameMonth(dayItem, monthStart);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { onSelectDate(dayItem); onClose(); }}
                                        className={`w-10 h-10 justify-center items-center mb-1 rounded-full ${isSelected ? 'bg-[#8B7EFF]' : ''}`}
                                    >
                                        <Text className={`text-base font-medium ${isSelected ? 'text-white font-bold' : isCurrentMonth ? 'text-[#1C1C1E]' : 'text-gray-200'}`}>
                                            {format(dayItem, 'd')}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

// --- Main Trigger Component ---
export default function DatePicker({ date, onSelect }: Props) {
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <>
            <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text className="text-base text-gray-500">Date</Text>
                <TouchableOpacity
                    onPress={() => setShowCalendar(true)}
                    className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2"
                >
                    <Ionicons name="calendar-outline" size={16} color="#1C1C1E" />
                    <Text className="font-medium text-sm text-[#1C1C1E]">
                        {format(date, 'MMM d, yyyy')}
                    </Text>
                </TouchableOpacity>
            </View>

            {showCalendar && (
                <CustomCalendar
                    selectedDate={date}
                    onSelectDate={onSelect}
                    onClose={() => setShowCalendar(false)}
                />
            )}
        </>
    );
}