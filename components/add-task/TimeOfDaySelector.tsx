import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

type Props = {
    currentSection: string;
    onSelect: (section: string) => void;
};

export default function TimeOfDaySelector({ currentSection, onSelect }: Props) {

    const getCurrentDisplay = () => {
        const map: Record<string, { label: string, color: string, bg: string, icon: string }> = {
            anytime: { label: 'Anytime', color: '#4B5563', bg: 'bg-gray-100', icon: 'time-outline' },
            morning: { label: 'Morning', color: '#EA580C', bg: 'bg-orange-100', icon: 'sunny-outline' },
            afternoon: { label: 'Day', color: '#0284C7', bg: 'bg-sky-100', icon: 'sunny' },
            evening: { label: 'Evening', color: '#7C3AED', bg: 'bg-purple-100', icon: 'moon-outline' },
            done: { label: 'To-do', color: '#4B5563', bg: 'bg-gray-100', icon: 'file-tray-full-outline' },
        };
        return map[currentSection] || map.morning;
    };

    const display = getCurrentDisplay();

    const MenuRow = ({ label, value, iconLib: IconLib, iconName }: any) => {
        const isSelected = currentSection === value;
        return (
            <MenuOption onSelect={() => onSelect(value)} style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                <View className="flex-row items-center gap-3">
                    <View className="w-5 items-center">
                        {isSelected && <Ionicons name="checkmark" size={18} color="black" />}
                    </View>
                    <IconLib name={iconName} size={20} color="#1C1C1E" />
                    <Text className={`text-base ${isSelected ? 'font-medium text-black' : 'text-gray-700'}`}>
                        {label}
                    </Text>
                </View>
            </MenuOption>
        );
    };

    return (
        <View className="flex-row items-center justify-between py-4 border-b border-gray-100 z-50">
            <Text className="text-base text-gray-500">Time of day</Text>
            <Menu>
                <MenuTrigger>
                    <View className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full ${display.bg}`}>
                        {/* @ts-ignore */}
                        <Ionicons name={display.icon} size={16} color={display.color} />
                        <Text style={{ color: display.color }} className="font-medium text-sm capitalize">
                            {display.label}
                        </Text>
                    </View>
                </MenuTrigger>

                <MenuOptions customStyles={menuStyles}>
                    <Text className="text-xs font-semibold text-gray-400 px-4 pt-2 pb-1 pl-12">Time of day</Text>
                    <MenuRow label="Anytime" value="anytime" iconLib={Ionicons} iconName="time-outline" />
                    <MenuRow label="Morning" value="morning" iconLib={MaterialCommunityIcons} iconName="weather-sunset-up" />
                    <MenuRow label="Day" value="afternoon" iconLib={Ionicons} iconName="sunny-outline" />
                    <MenuRow label="Evening" value="evening" iconLib={Ionicons} iconName="moon-outline" />

                    <View className="h-[1px] bg-gray-100 my-1" />

                    <Text className="text-xs font-semibold text-gray-400 px-4 pt-2 pb-1 pl-12">Event</Text>
                    <MenuOption disabled style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                        <View className="flex-row items-center gap-3 opacity-50">
                            <View className="w-5" />
                            <MaterialCommunityIcons name="calendar-clock" size={20} color="#1C1C1E" />
                            <Text className="text-base text-gray-700">At time</Text>
                        </View>
                    </MenuOption>

                    <View className="h-[1px] bg-gray-100 my-1" />
                    <MenuRow label="To-do" value="done" iconLib={MaterialCommunityIcons} iconName="inbox-outline" />
                </MenuOptions>
            </Menu>
        </View>
    );
}

const menuStyles = {
    optionsContainer: {
        borderRadius: 20,
        width: 220,
        marginTop: 35,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
        paddingVertical: 8,
    },
};