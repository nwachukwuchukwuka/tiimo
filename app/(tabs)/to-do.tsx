// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import { StatusBar } from 'expo-status-bar';
// import React, { useCallback, useMemo, useRef } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Animated, { FadeOut, Layout } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import AddTaskSheet from '@/components/AddTaskSheet';
// import { ListItem, SectionType, TaskItem, useTodo } from '@/context/TodoContext';

// const SECTIONS_CONFIG: Record<SectionType, { label: string; bg: string; text: string; icon: any }> = {
//   HIGH: { label: 'HIGH', bg: 'bg-red-50', text: 'text-red-600', icon: 'caret-up' },
//   MEDIUM: { label: 'MEDIUM', bg: 'bg-orange-50', text: 'text-orange-600', icon: 'ellipse' },
//   LOW: { label: 'LOW', bg: 'bg-blue-50', text: 'text-blue-600', icon: 'caret-down' },
//   TODO: { label: 'TO-DO', bg: 'bg-gray-100', text: 'text-gray-600', icon: 'list' },
//   DONE: { label: 'DONE', bg: 'bg-gray-100', text: 'text-gray-600', icon: 'checkmark-done' },
// };

// export default function TodoScreen() {
//   const { data, addTask, toggleTask, updateData } = useTodo();

//   const bottomSheetRef = useRef<BottomSheetModal>(null);

//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetRef.current?.present();
//   }, []);

//   const displayData = useMemo(() => {
//     const counts: Record<string, number> = { HIGH: 0, MEDIUM: 0, LOW: 0, TODO: 0, DONE: 0 };
//     data.forEach(item => {
//       if (item.type === 'TASK') counts[item.priority]++;
//     });

//     return data.map(item => {
//       if (item.type === 'HEADER') {
//         return { ...item, count: counts[item.section] };
//       }
//       return item;
//     });
//   }, [data]);

//   const onDragEnd = ({ data: newData }: { data: ListItem[] }) => {
//     let currentSection: SectionType = 'HIGH';
//     const updatedData = newData.map(item => {
//       if (item.type === 'HEADER') {
//         currentSection = item.section;
//         return item;
//       } else {
//         const isNowDone = currentSection === 'DONE';
//         return {
//           ...item,
//           priority: currentSection,
//           completed: isNowDone,
//         } as TaskItem;
//       }
//     });
//     updateData(updatedData); 
//   };

//   const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<ListItem>) => {
//     if (item.type === 'HEADER') {
//       const config = SECTIONS_CONFIG[item.section];
//       return (
//         <View className="mt-6 mb-2 flex-row justify-between items-center opacity-100">
//           <View className={`flex-row items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg}`}>
//              {item.section !== 'TODO' && item.section !== 'DONE' && (
//                <Ionicons name={config.icon} size={10} color={config.text.replace('text-', '').replace('-600', '')} />
//              )}
//              <Text className={`text-xs font-bold tracking-wide ${config.text}`}>
//                {config.label} ({item.count})
//              </Text>
//              <Ionicons name="chevron-down" size={12} color="rgba(0,0,0,0.3)" />
//           </View>
//           <TouchableOpacity onPress={handlePresentModalPress}>
//              <Ionicons name="add" size={20} color="#D1D5DB" />
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     const task = item as TaskItem;
//     return (
//       <Animated.View exiting={FadeOut.duration(250)} layout={Layout.springify()}>
//         <ScaleDecorator>
//           <TouchableOpacity
//             onLongPress={drag}
//             onPress={() => toggleTask(task.id)} 
//             disabled={isActive}
//             activeOpacity={1}
//             className={`
//               flex-row items-center justify-between p-4 bg-white rounded-2xl mb-2 
//               ${isActive ? 'shadow-xl scale-105 z-50' : 'shadow-sm'}
//             `}
//           >
//             <View className="flex-row items-center gap-3">
//               <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
//                 <Text className="text-xl">{task.icon}</Text>
//               </View>
//               <Text className={`text-base font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-[#1C1C1E]'}`}>
//                 {task.title}
//               </Text>
//             </View>
//             <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${task.completed ? 'bg-gray-500 border-gray-500' : 'border-[#1C1C1E]'}`}>
//               {task.completed && <Ionicons name="checkmark" size={14} color="white" />}
//             </View>
//           </TouchableOpacity>
//         </ScaleDecorator>
//       </Animated.View>
//     );
//   }, [displayData, handlePresentModalPress]);

//   const totalTasks = data.filter(i => i.type === 'TASK').length;
//   const completedTasks = data.filter(i => i.type === 'TASK' && i.completed).length;

//   return (
//     <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
//       <StatusBar style="dark" />
//       <View className="px-6 pt-2 pb-4 z-10 bg-[#FAFAFA]">
//         <View className="flex-row justify-between items-start mb-2">
//             <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-2 shadow-sm border border-gray-100">
//                 <Ionicons name="sparkles" size={12} color="black" />
//                 <Text className="text-xs font-bold text-[#1C1C1E]">{completedTasks} / {totalTasks}</Text>
//             </View>
//             <View className="flex-row gap-3">
//                  <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
//                     <Ionicons name="options-outline" size={20} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handlePresentModalPress} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
//                     <Ionicons name="add" size={24} color="black" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//         <Text className="text-4xl font-serif text-center text-[#1C1C1E] mt-[-30px]">To-do</Text>
//       </View>

//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <DraggableFlatList
//           data={displayData}
//           onDragEnd={onDragEnd}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
//           showsVerticalScrollIndicator={false}
//         />
//       </GestureHandlerRootView>

//       <AddTaskSheet ref={bottomSheetRef} onAddTask={addTask} />
//     </SafeAreaView>
//   );
// }



import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeOut, Layout } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddTaskModal from '@/components/AddTaskModal';
import AddTaskSheet from '@/components/AddTaskSheet';
import { Task } from '@/constants';
import { ListItem, SectionType, TaskItem, useTodo } from '@/context/TodoContext';

const SECTIONS_CONFIG: Record<SectionType, { label: string; bg: string; text: string; icon: any }> = {
  HIGH: { label: 'HIGH', bg: 'bg-red-50', text: 'text-red-600', icon: 'caret-up' },
  MEDIUM: { label: 'MEDIUM', bg: 'bg-orange-50', text: 'text-orange-600', icon: 'ellipse' },
  LOW: { label: 'LOW', bg: 'bg-blue-50', text: 'text-blue-600', icon: 'caret-down' },
  TODO: { label: 'TO-DO', bg: 'bg-gray-100', text: 'text-gray-600', icon: 'list' },
  DONE: { label: 'DONE', bg: 'bg-gray-100', text: 'text-gray-600', icon: 'checkmark-done' },
};

export default function TodoScreen() {
  const { data, addTask, toggleTask, updateData } = useTodo();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const displayData = useMemo(() => {
    const counts: Record<string, number> = { HIGH: 0, MEDIUM: 0, LOW: 0, TODO: 0, DONE: 0 };
    data.forEach(item => {
      if (item.type === 'TASK') counts[item.priority]++;
    });

    return data.map(item => {
      if (item.type === 'HEADER') {
        return { ...item, count: counts[item.section] };
      }
      return item;
    });
  }, [data]);

  const onDragEnd = ({ data: newData }: { data: ListItem[] }) => {
    let currentSection: SectionType = 'HIGH';
    const updatedData = newData.map(item => {
      if (item.type === 'HEADER') {
        currentSection = item.section;
        return item;
      } else {
        const isNowDone = currentSection === 'DONE';
        return {
          ...item,
          priority: currentSection,
          completed: isNowDone,
        } as TaskItem;
      }
    });
    updateData(updatedData);
  };

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<ListItem>) => {
    if (item.type === 'HEADER') {
      const config = SECTIONS_CONFIG[item.section];
      return (
        <View className="mt-6 mb-2 flex-row justify-between items-center opacity-100">
          <View className={`flex-row items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg}`}>
            {item.section !== 'TODO' && item.section !== 'DONE' && (
              <Ionicons name={config.icon} size={10} color={config.text.replace('text-', '').replace('-600', '')} />
            )}
            <Text className={`text-xs font-bold tracking-wide ${config.text}`}>
              {config.label} ({item.count})
            </Text>
            <Ionicons name="chevron-down" size={12} color="rgba(0,0,0,0.3)" />
          </View>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <Ionicons name="add" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        </View>
      );
    }

    const task = item as TaskItem;
    return (
      <Animated.View exiting={FadeOut.duration(250)} layout={Layout.springify()}>
        <ScaleDecorator>
          <TouchableOpacity
            onLongPress={drag}
            onPress={() => toggleTask(task.id)}
            disabled={isActive}
            activeOpacity={1}
            className={`
              flex-row items-center justify-between p-4 bg-white rounded-2xl mb-2 
              ${isActive ? 'shadow-xl scale-105 z-50' : 'shadow-sm'}
            `}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
                <Text className="text-xl">{task.icon}</Text>
              </View>
              <Text className={`text-base font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-[#1C1C1E]'}`}>
                {task.title}
              </Text>
            </View>
            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${task.completed ? 'bg-gray-500 border-gray-500' : 'border-[#1C1C1E]'}`}>
              {task.completed && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
          </TouchableOpacity>
        </ScaleDecorator>
      </Animated.View>
    );
  }, [displayData, handlePresentModalPress]);

  const totalTasks = data.filter(i => i.type === 'TASK').length;
  const completedTasks = data.filter(i => i.type === 'TASK' && i.completed).length;

  const handleOpenDetailedAdd = (currentTitle: string) => {
    // Create a temporary task object to pre-fill the modal
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      title: currentTitle,
      duration: '15m',
      icon: '✨',
      iconBg: 'bg-gray-100',
      iconColor: '#6B7280',
      isCompleted: false,
      originalSection: 'anytime'
    };

    setSelectedTask(tempTask);

    // Short delay to allow keyboard/sheet to close smoothly
    setTimeout(() => {
      setAddTaskModalVisible(true);
    }, 100);
  };


  const handleSaveTaskCopy = (taskToCopy: Task) => {
    // setDailyData(prev => {
    //   const newCopy: Task = {
    //     ...taskToCopy,
    //     id: `task-copy-${Date.now()}`,
    //     title: `${taskToCopy.title} (Copy)`,
    //     isCompleted: false,
    //     originalSection: 'morning',
    //     subTasks: taskToCopy.subTasks?.map(st => ({ ...st, isCompleted: false }))
    //   };
    //   return { ...prev, morning: [...prev.morning, newCopy] };
    // });
    setAddTaskModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      <StatusBar style="dark" />
      <View className="px-6 pt-2 pb-4 z-10 bg-[#FAFAFA]">
        <View className="flex-row justify-between items-start mb-2">
          <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-2 shadow-sm border border-gray-100">
            <Ionicons name="sparkles" size={12} color="black" />
            <Text className="text-xs font-bold text-[#1C1C1E]">{completedTasks} / {totalTasks}</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
              <Ionicons name="options-outline" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModalPress} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-4xl font-serif text-center text-[#1C1C1E] mt-[-30px]">To-do</Text>
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableFlatList
          data={displayData}
          onDragEnd={onDragEnd}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>

      {/* <AddTaskSheet ref={bottomSheetRef} onAddTask={addTask} /> */}
      <AddTaskSheet
        ref={bottomSheetRef}
        onAddTask={addTask}
        onOpenDetails={handleOpenDetailedAdd}
      />

      {selectedTask && (
        <>
          <AddTaskModal
            visible={isAddTaskModalVisible}
            onClose={() => setAddTaskModalVisible(false)}
            onSave={handleSaveTaskCopy} initialTask={selectedTask} />
        </>
      )}
    </SafeAreaView>
  );
}