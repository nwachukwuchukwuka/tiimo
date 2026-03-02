import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Data Types ---
type Category = {
    label: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

type Task = {
    id: string;
    title: string;
    duration: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    bg: string;
    category?: string;
};

// --- Mock Data ---
const RECENT_TASKS: Task[] = [
    { id: '1', title: 'Plan your day', duration: '10 m', icon: 'clipboard-text-outline', color: '#000000', bg: 'bg-[#FEF9C3]' }, // Yellow
    { id: '2', title: 'Evening routine', duration: '10 m', icon: 'moon-waning-crescent', color: '#F59E0B', bg: 'bg-[#FDF2F8]' }, // Pinkish
    { id: '3', title: 'Have dinner', duration: '20 m', icon: 'food-turkey', color: '#22C55E', bg: 'bg-[#F0FDF4]' },
];

const CATEGORIES: Category[] = [
    { label: 'Household', icon: 'basket' },
    { label: 'Human needs', icon: 'water' },
    { label: 'Commute', icon: 'car' },
    { label: 'Exercise', icon: 'run' },
    { label: 'Health', icon: 'brain' },
    { label: 'Hobby', icon: 'palette' },
    { label: 'Pets', icon: 'paw' },
    { label: 'Preparation', icon: 'bell' },
    { label: 'Relationships', icon: 'heart' },
    { label: 'Self care', icon: 'flower' },
    { label: 'Work', icon: 'laptop' },
];

const FILTERED_RESULTS: Record<string, Task[]> = {
    'Household': [
        { id: 'h1', title: 'Clean bedroom', duration: '30 m', icon: 'bed-empty', color: '#000', bg: 'bg-[#C7D2FE]' },
        { id: 'h2', title: 'Do laundry', duration: '1 h', icon: 'washing-machine', color: '#000', bg: 'bg-[#E9D5FF]' },
        { id: 'h3', title: 'Let’s bake', duration: '1 h 30 m', icon: 'chef-hat', color: '#000', bg: 'bg-[#C7D2FE]' },
        { id: 'h4', title: 'Vacuum', duration: '20 m', icon: 'robot-vacuum', color: '#000', bg: 'bg-[#C7D2FE]' },
    ]
};

export default function ExploreScreen() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Filter Logic
    const activeTasks = selectedCategory && FILTERED_RESULTS[selectedCategory.label]
        ? FILTERED_RESULTS[selectedCategory.label]
        : [];

    const handleCategoryPress = (cat: Category) => {
        setSelectedCategory(cat);
    };

    const clearFilter = () => {
        setSelectedCategory(null);
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>

                {/* --- Header --- */}
                <View className="px-5 py-4 pt-10">
                    <Text className="text-3xl font-bold text-black mb-4">Explore</Text>

                    {/* Search Bar Container */}
                    <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm h-14">
                        <Ionicons name="search" size={20} color="gray" style={{ marginLeft: 8 }} />

                        {selectedCategory ? (
                            <View className="flex-1 flex-row items-center ml-2">
                                <View className="flex-row items-center bg-[#C7D2FE] px-3 py-1.5 rounded-md self-start">
                                    <MaterialCommunityIcons name={selectedCategory.icon} size={16} color="#4338CA" />
                                    <Text className="ml-2 font-bold text-[#1E1B4B]">{selectedCategory.label}</Text>
                                </View>
                                <View className="flex-1" /> 
                                <TouchableOpacity onPress={clearFilter}>
                                    <Ionicons name="close-circle" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TextInput
                                placeholder="I am looking for"
                                placeholderTextColor="gray"
                                className="flex-1 ml-2 text-base h-full"
                            />
                        )}
                    </View>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    {selectedCategory ? (
                        <View className="px-5 pt-2">
                            {activeTasks.map((task) => (
                                <View key={task.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4">
                                    <View className="mb-4">
                                        <Text className="text-base font-bold text-black">{task.title}</Text>
                                        <View className="flex-row items-center mt-1">
                                            <Ionicons name="time-outline" size={16} color="black" />
                                            <Text className="text-sm text-black ml-1">{task.duration}</Text>
                                        </View>
                                    </View>

                                    {/* Bottom Row: Large Colored Circle & Arrow Button */}
                                    <View className="flex-row justify-between items-end">
                                        <View className={`w-14 h-14 rounded-full ${task.bg}`} />

                                        {/* Action Button */}
                                        <TouchableOpacity className="w-10 h-10 bg-black rounded-full items-center justify-center">
                                            <Ionicons name="arrow-up" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            {activeTasks.length === 0 && (
                                <Text className="text-gray-400 text-center mt-10">No tasks found for this category.</Text>
                            )}
                        </View>
                    ) : (

                        <>
                            {/* Recent Tasks Horizontal Scroll */}
                            <View className="px-5 mb-8 pt-5">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-xl font-bold text-black">Recent tasks</Text>
                                    <TouchableOpacity onPress={() => router.push('/home-screens/all-tasks')}>
                                        <Text className="text-sm font-bold text-black flex-row items-center">
                                            See all <Ionicons name="arrow-forward" size={12} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4 overflow-visible">
                                    {RECENT_TASKS.map((task) => (
                                        <View
                                            key={task.id}
                                            className="w-40 bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm mr-4"
                                            style={{ minHeight: 160 }}
                                        >
                                            {/* Header Info */}
                                            <View className="flex-1">
                                                <Text className="font-bold text-lg leading-6 mb-1">{task.title}</Text>
                                                <View className="flex-row items-center">
                                                    <Ionicons name="time-outline" size={14} color="black" />
                                                    <Text className="text-xs text-black ml-1 font-medium">{task.duration}</Text>
                                                </View>
                                            </View>

                                            {/* Bottom Row */}
                                            <View className="flex-row justify-between items-end mt-4">
                                                {/* Icon Circle */}
                                                <View className={`w-14 h-14 rounded-full items-center justify-center ${task.bg}`}>
                                                    <MaterialCommunityIcons
                                                        name={task.icon}
                                                        size={24}
                                                        color={task.icon === 'moon-waning-crescent' ? '#FBBF24' : task.color}
                                                    />
                                                </View>

                                                {/* Arrow Button */}
                                                <TouchableOpacity className="w-10 h-10 bg-black rounded-full items-center justify-center">
                                                    <Ionicons name="arrow-up" size={18} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Categories Grid */}
                            <View className="px-5 pb-10 pt-5">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <Ionicons name="moon-outline" size={18} color="black" />
                                    <Text className="text-black font-medium">This evening I am looking for</Text>
                                </View>
                                <Text className="text-2xl font-bold text-black mb-4">Today</Text>

                                <View className="flex-row flex-wrap gap-2">
                                    {CATEGORIES.map((cat, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            onPress={() => handleCategoryPress(cat)}
                                            className="flex-row items-center bg-white border border-gray-200 px-3 py-2 rounded-xl active:bg-gray-50"
                                        >
                                            <MaterialCommunityIcons name={cat.icon} size={16} color="#4B5563" />
                                            <Text className="ml-2 font-bold text-gray-600">{cat.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}