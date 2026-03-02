import { Task } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    task: Task;
    onPress: () => void;
    onToggle: () => void;
    onSubTaskToggle?: (subTaskId: string) => void;
};

export default function DynamicTaskCard({ task, onPress, onToggle, onSubTaskToggle }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleLocalToggle = () => {
        if (!task.isCompleted) {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(scaleAnim, { toValue: 0.95, duration: 300, useNativeDriver: true })
            ]).start(() => onToggle());
        } else {
            onToggle();
        }
    };

    const hasSubTasks = task.subTasks && task.subTasks.length > 0;
    const totalSub = task.subTasks?.length || 0;
    const completedSub = task.subTasks?.filter(st => st.isCompleted).length || 0;
    const progressPercent = totalSub > 0 ? (completedSub / totalSub) * 100 : 0;

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <Animated.View
            style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            className={`rounded-3xl mb-3 border ${task.isCompleted ? 'bg-white border-gray-50 opacity-60' : 'bg-white border-gray-100 shadow-sm'}`}
        >
            <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="p-4 flex-row items-center justify-between">
                <View className="flex-row gap-3 items-center">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${task.iconBg}`}>
                        {/* @ts-ignore */}
                        <MaterialCommunityIcons name={task.icon as any} size={20} color={task.iconColor} />
                    </View>
                    <View>
                        <Text className={`text-base font-bold ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</Text>
                        {!task.isCompleted && (
                            <Text className="text-gray-500 text-xs font-medium mt-0.5">{task.duration}</Text>
                        )}
                    </View>
                </View>
                <TouchableOpacity onPress={handleLocalToggle} hitSlop={10}>
                    {task.isCompleted ? (
                        <Ionicons name="checkmark-circle" size={28} color="#6B7280" />
                    ) : (
                        <View className="w-6 h-6 rounded-full border-2 border-black items-center justify-center" />
                    )}
                </TouchableOpacity>
            </TouchableOpacity>

            {hasSubTasks && !task.isCompleted && (
                <TouchableOpacity onPress={toggleExpand} activeOpacity={0.6} className="px-4 pb-3 pt-0">
                    <View className="flex-row justify-between items-center mt-1">
                        <View className="flex-row items-center gap-2">
                            <View className="h-1.5 w-8 bg-gray-100 rounded-full overflow-hidden">
                                <View className="h-full bg-gray-200 rounded-full" style={{ width: `${progressPercent}%` }} />
                            </View>
                            <Text className="text-[10px] font-medium text-gray-400">{completedSub}/{totalSub}</Text>
                        </View>
                        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
                    </View>
                </TouchableOpacity>
            )}

            {isExpanded && hasSubTasks && !task.isCompleted && (
                <View className="pl-4 pr-4 pb-4 pt-1 border-t border-gray-50">
                    {task.subTasks!.map((subTask) => (
                        <View key={subTask.id} className="flex-row items-center justify-between py-2 ml-10">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                    {/* @ts-ignore */}
                                    <MaterialCommunityIcons name={subTask.icon || 'circle-small'} size={16} color="#6B7280" />
                                </View>
                                <Text className={`text-sm font-semibold ${subTask.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{subTask.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => onSubTaskToggle && onSubTaskToggle(subTask.id)} hitSlop={10}>
                                {subTask.isCompleted ? (
                                    <Ionicons name="checkmark-circle" size={24} color="#6B7280" />
                                ) : (
                                    <View className="w-5 h-5 rounded-full border-2 border-black items-center justify-center" />
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </Animated.View>
    );
}