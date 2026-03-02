// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

// type Props = {
//     hour: number;
//     min: number;
//     onHourChange: (h: number) => void;
//     onMinChange: (m: number) => void;
// };

// const TimeColumn = ({ data, selected, onSelect }: { data: number[], selected: number, onSelect: (val: number) => void }) => (
//     <ScrollView className="h-36 w-16" showsVerticalScrollIndicator={false} snapToInterval={40} decelerationRate="fast">
//         <View className="h-14" />
//         {data.map((item) => (
//             <TouchableOpacity key={item} onPress={() => onSelect(item)} className="h-10 justify-center items-center">
//                 <Text className={`text-lg ${item === selected ? 'font-bold text-[#1C1C1E]' : 'text-gray-400 font-normal'}`}>
//                     {item}
//                 </Text>
//             </TouchableOpacity>
//         ))}
//         <View className="h-14" />
//     </ScrollView>
// );

// export default function DurationPicker({ hour, min, onHourChange, onMinChange }: Props) {
//     const hours = Array.from({ length: 13 }, (_, i) => i);
//     const mins = Array.from({ length: 12 }, (_, i) => i * 5);

//     return (
//         <View className="flex-row items-center justify-between py-4 border-b border-gray-100 z-40">
//             <Text className="text-base text-gray-500">Duration</Text>
//             <Menu>
//                 <MenuTrigger>
//                     <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
//                         <Ionicons name="time-outline" size={16} color="#1C1C1E" />
//                         <Text className="font-medium text-sm text-[#1C1C1E]">{hour}h {min}m</Text>
//                     </View>
//                 </MenuTrigger>

//                 <MenuOptions customStyles={menuStyles}>
//                     <View className="flex-row justify-center items-center h-40 relative">
//                         {/* Highlight Bar */}
//                         <View className="absolute top-14 left-2 right-2 h-10 bg-gray-200 rounded-xl -z-10" />

//                         <TimeColumn data={hours} selected={hour} onSelect={onHourChange} />
//                         <Text className="text-sm font-semibold text-gray-500 mb-1">hr</Text>

//                         <View className="w-[1px] bg-gray-200 h-32 self-center mx-3" />

//                         <TimeColumn data={mins} selected={min} onSelect={onMinChange} />
//                         <Text className="text-sm font-semibold text-gray-500 mb-1">min</Text>
//                     </View>
//                 </MenuOptions>
//             </Menu>
//         </View>
//     );
// }

// const menuStyles = {
//     optionsContainer: {
//         borderRadius: 24,
//         width: 250,
//         marginTop: 30,
//         backgroundColor: '#F3F4F6',
//         padding: 10,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.15,
//         shadowRadius: 20,
//         elevation: 10,
//     },
// };


import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

type Props = {
    hour: number;
    min: number;
    onHourChange: (h: number) => void;
    onMinChange: (m: number) => void;
};

export default function DurationPicker({ hour, min, onHourChange, onMinChange }: Props) {
    const hours = Array.from({ length: 13 }, (_, i) => i);
    const mins = Array.from({ length: 12 }, (_, i) => i * 5);

    return (
        <View className="flex-row items-center justify-between py-4 border-b border-gray-100 z-40">
            <Text className="text-base text-gray-500">Duration</Text>
            <Menu>
                <MenuTrigger>
                    <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
                        <Ionicons name="time-outline" size={16} color="#1C1C1E" />
                        <Text className="font-medium text-sm text-[#1C1C1E]">{hour}h {min}m</Text>
                    </View>
                </MenuTrigger>

                <MenuOptions customStyles={menuStyles}>
                    <View className="flex-row items-center justify-center px-2">
                        {/* Hour Picker */}
                        <View className="flex-1 items-center">
                            <Text className="text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">hr</Text>
                            <Picker
                                selectedValue={hour}
                                onValueChange={(val) => onHourChange(val)}
                                style={{ width: 100, height: 150 }}
                                itemStyle={{ fontSize: 18, color: '#1C1C1E', height: 150 }}
                            >
                                {hours.map((h) => (
                                    <Picker.Item key={h} label={`${h}`} value={h} />
                                ))}
                            </Picker>
                        </View>

                        {/* Divider */}
                        <Text className="text-2xl font-bold text-gray-300 mb-1">:</Text>

                        {/* Minute Picker */}
                        <View className="flex-1 items-center">
                            <Text className="text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">min</Text>
                            <Picker
                                selectedValue={min}
                                onValueChange={(val) => onMinChange(val)}
                                style={{ width: 100, height: 150 }}
                                itemStyle={{ fontSize: 18, color: '#1C1C1E', height: 150 }}
                            >
                                {mins.map((m) => (
                                    <Picker.Item key={m} label={`${m}`} value={m} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </MenuOptions>
            </Menu>
        </View>
    );
}

const menuStyles = {
    optionsContainer: {
        borderRadius: 24,
        width: 260,
        marginTop: 30,
        backgroundColor: '#F3F4F6',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
};