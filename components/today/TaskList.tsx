import { DailyData, Task } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DynamicTaskCard from './DynamicTaskCard';

type Props = {
    dailyData: DailyData;
    onTaskPress: (task: Task) => void;
    onToggleParentTask: (task: Task, section: keyof DailyData) => void;
    onSubTaskToggle: (parentTask: Task, subId: string, section: keyof DailyData) => void;
};

const SectionHeader = ({ label, count }: { label: string; count: number }) => {
    const styles: { [key: string]: any } = {
        anytime: { bg: 'bg-gray-100', icon: 'time-outline' },
        morning: { bg: 'bg-orange-50', icon: 'sunny-outline' },
        afternoon: { bg: 'bg-blue-50', icon: 'sunny' },
        evening: { bg: 'bg-purple-50', icon: 'moon-outline' },
        done: { bg: 'bg-gray-100', icon: 'checkmark-circle-outline' }
    };

    const sectionKey = label.toLowerCase();
    const current = styles[sectionKey] || styles.anytime;

    return (
        <View className={`flex-row items-center gap-2 py-2 px-3 rounded-lg self-start mb-3 mt-4 ${current.bg}`}>
            <Ionicons name={current.icon} size={14} color="black" style={{ opacity: 0.6 }} />
            <Text className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">
                {label} ({count})
            </Text>
            <Ionicons name="chevron-down" size={10} color="black" style={{ opacity: 0.4 }} />
        </View>
    );
};

const EmptySlot = ({ placeholder }: { placeholder: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between p-4 border border-dashed border-gray-200 rounded-2xl mb-2 active:bg-gray-50">
        <Text className="text-gray-400 font-medium text-sm">{placeholder}</Text>
        <View className="bg-gray-100 rounded-full p-1">
            <Ionicons name="add" size={16} color="#9CA3AF" />
        </View>
    </TouchableOpacity>
);

export default function TaskList({ dailyData, onTaskPress, onToggleParentTask, onSubTaskToggle }: Props) {
    return (
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Hint Card */}
            <View className="bg-[#F2F2F7] p-4 rounded-2xl flex-row items-center gap-4 mb-6 relative">
                <View className="w-10 items-center justify-center">
                    <MaterialCommunityIcons name="gesture-pinch" size={32} color="#1C1C1E" />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-gray-900 text-sm mb-0.5">Pinch for list view</Text>
                    <Text className="text-xs text-gray-500 leading-4">Pinch with two fingers to switch between timeline and list views.</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3 bg-gray-200/50 rounded-full p-0.5">
                    <Ionicons name="close" size={14} color="#8E8E93" />
                </TouchableOpacity>
            </View>

            {['Anytime', 'Morning', 'Afternoon', 'Evening'].map((label) => {
                const key = label.toLowerCase() as keyof DailyData;
                const tasks = dailyData[key];
                if (key === 'done') return null;

                return (
                    <View key={key}>
                        <SectionHeader label={label} count={tasks.length} />
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <DynamicTaskCard
                                    key={task.id}
                                    task={task}
                                    onPress={() => onTaskPress(task)}
                                    onToggle={() => onToggleParentTask(task, key)}
                                    onSubTaskToggle={(subId) => onSubTaskToggle(task, subId, key)}
                                />
                            ))
                        ) : (
                            <EmptySlot placeholder={`${label} tasks here`} />
                        )}
                    </View>
                )
            })}

            {dailyData.done.length > 0 && (
                <View className="mt-4">
                    <SectionHeader label="Done" count={dailyData.done.length} />
                    {dailyData.done.map(task => (
                        <DynamicTaskCard
                            key={task.id}
                            task={task}
                            onPress={() => onTaskPress(task)}
                            onToggle={() => onToggleParentTask(task, 'done')}
                        />
                    ))}
                </View>
            )}
        </ScrollView>
    );
}