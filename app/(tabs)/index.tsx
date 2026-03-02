// import AddTaskModal from '@/components/AddTaskModal';
// import AddTaskSheet from '@/components/AddTaskSheet';
// import EditTaskModal from '@/components/EditTaskModal';
// import TaskActionSheet from '@/components/TaskActionSheet';
// import WeeklyCalendar from '@/components/WeeklyCalendar';
// import { useTodo } from '@/context/TodoContext';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import { format } from 'date-fns';
// import { useRouter } from 'expo-router';
// import React, { useMemo, useRef, useState } from 'react';
// import {
//   Animated,
//   LayoutAnimation,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View
// } from 'react-native';
// import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from "react-native-popup-menu";
// import { SafeAreaView } from 'react-native-safe-area-context';


// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- Types ---
// export type SubTask = {
//   id: string;
//   title: string;
//   isCompleted: boolean;
//   icon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
// };

// export type Task = {
//   id: string;
//   title: string;
//   duration: string;
//   // icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
//   icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap | string; // ✅ add | string
//   iconBg: string;
//   iconColor: string;
//   isCompleted: boolean;
//   originalSection: keyof DailyData;
//   subTasks?: SubTask[];
// };

// type DailyData = {
//   anytime: Task[];
//   morning: Task[];
//   afternoon: Task[];
//   evening: Task[];
//   done: Task[];
// };

// // --- Mock Data Setup ---
// const INITIAL_TASKS: DailyData = {
//   anytime: [],
//   morning: [
//     {
//       id: '1',
//       title: 'Plan your day',
//       duration: '10m',
//       icon: 'clipboard-text-outline',
//       iconBg: 'bg-yellow-100',
//       iconColor: '#EAB308',
//       isCompleted: false,
//       originalSection: 'morning'
//     },
//     {
//       id: '2',
//       title: 'Morning routine',
//       duration: '30m',
//       icon: 'weather-sunset',
//       iconBg: 'bg-orange-100',
//       iconColor: '#F97316',
//       isCompleted: false,
//       originalSection: 'morning',
//       subTasks: [
//         { id: 's1', title: 'Wake up', isCompleted: false, icon: 'weather-sunset' },
//         { id: 's2', title: 'Brush teeth', isCompleted: false, icon: 'toothbrush' },
//         { id: 's3', title: 'Breakfast', isCompleted: false, icon: 'food-croissant' },
//         { id: 's4', title: 'Have coffee', isCompleted: false, icon: 'coffee' },
//       ]
//     },
//   ],
//   afternoon: [
//     { id: '3', title: 'Quick tidy', duration: '5m', icon: 'broom', iconBg: 'bg-blue-100', iconColor: '#6366F1', isCompleted: false, originalSection: 'afternoon' },
//     { id: '4', title: 'Drink water', duration: '5m', icon: 'water-outline', iconBg: 'bg-cyan-100', iconColor: '#06B6D4', isCompleted: false, originalSection: 'afternoon' },
//     { id: '5', title: 'Start work', duration: '5m', icon: 'laptop', iconBg: 'bg-gray-200', iconColor: '#4B5563', isCompleted: false, originalSection: 'afternoon' },
//     { id: '6', title: 'Lunch', duration: '20m', icon: 'food-outline', iconBg: 'bg-purple-100', iconColor: '#8B5CF6', isCompleted: false, originalSection: 'afternoon' },
//   ],
//   evening: [
//     { id: '7', title: 'Have dinner', duration: '20m', icon: 'food-turkey', iconBg: 'bg-green-100', iconColor: '#22C55E', isCompleted: false, originalSection: 'evening' },
//     { id: '8', title: 'Evening routine', duration: '10m', icon: 'moon-waning-crescent', iconBg: 'bg-yellow-50', iconColor: '#F59E0B', isCompleted: false, originalSection: 'evening' },
//   ],
//   done: []
// };

// const SectionHeader = ({ label, count }: { label: string; count: number }) => {
//   const styles: { [key: string]: any } = {
//     anytime: { bg: 'bg-gray-100', icon: 'time-outline' },
//     morning: { bg: 'bg-orange-50', icon: 'sunny-outline' },
//     afternoon: { bg: 'bg-blue-50', icon: 'sunny' },
//     evening: { bg: 'bg-purple-50', icon: 'moon-outline' },
//     done: { bg: 'bg-gray-100', icon: 'checkmark-circle-outline' }
//   };

//   const sectionKey = label.toLowerCase();
//   const current = styles[sectionKey] || styles.anytime;

//   return (
//     <View className={`flex-row items-center gap-2 py-2 px-3 rounded-lg self-start mb-3 mt-4 ${current.bg}`}>
//       <Ionicons name={current.icon} size={14} color="black" style={{ opacity: 0.6 }} />
//       <Text className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">
//         {label} ({count})
//       </Text>
//       <Ionicons name="chevron-down" size={10} color="black" style={{ opacity: 0.4 }} />
//     </View>
//   );
// };

// const EmptySlot = ({ placeholder }: { placeholder: string }) => (
//   <TouchableOpacity className="flex-row items-center justify-between p-4 border border-dashed border-gray-200 rounded-2xl mb-2 active:bg-gray-50">
//     <Text className="text-gray-400 font-medium text-sm">{placeholder}</Text>
//     <View className="bg-gray-100 rounded-full p-1">
//       <Ionicons name="add" size={16} color="#9CA3AF" />
//     </View>
//   </TouchableOpacity>
// );

// const DynamicTaskCard = ({
//   task,
//   onPress,
//   onToggle,
//   onSubTaskToggle
// }: {
//   task: Task;
//   onPress: () => void;
//   onToggle: () => void;
//   onSubTaskToggle?: (subTaskId: string) => void;
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(1)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const handleLocalToggle = () => {
//     if (!task.isCompleted) {
//       Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
//         Animated.timing(scaleAnim, { toValue: 0.95, duration: 300, useNativeDriver: true })
//       ]).start(() => onToggle());
//     } else {
//       onToggle();
//     }
//   };

//   const hasSubTasks = task.subTasks && task.subTasks.length > 0;
//   const totalSub = task.subTasks?.length || 0;
//   const completedSub = task.subTasks?.filter(st => st.isCompleted).length || 0;
//   const progressPercent = totalSub > 0 ? (completedSub / totalSub) * 100 : 0;

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <Animated.View
//       style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
//       className={`rounded-3xl mb-3 border ${task.isCompleted ? 'bg-white border-gray-50 opacity-60' : 'bg-white border-gray-100 shadow-sm'}`}
//     >
//       <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="p-4 flex-row items-center justify-between">
//         <View className="flex-row gap-3 items-center">
//           <View className={`w-10 h-10 rounded-full items-center justify-center ${task.iconBg}`}>
//             {/* @ts-ignore */}
//             <MaterialCommunityIcons name={task.icon as any} size={20} color={task.iconColor} />
//           </View>
//           <View>
//             <Text className={`text-base font-bold ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</Text>
//             {!task.isCompleted && (
//               <Text className="text-gray-500 text-xs font-medium mt-0.5">{task.duration}</Text>
//             )}
//           </View>
//         </View>
//         <TouchableOpacity onPress={handleLocalToggle} hitSlop={10}>
//           {task.isCompleted ? (
//             <Ionicons name="checkmark-circle" size={28} color="#6B7280" />
//           ) : (
//             <View className="w-6 h-6 rounded-full border-2 border-black items-center justify-center" />
//           )}
//         </TouchableOpacity>
//       </TouchableOpacity>

//       {hasSubTasks && !task.isCompleted && (
//         <TouchableOpacity onPress={toggleExpand} activeOpacity={0.6} className="px-4 pb-3 pt-0">
//           <View className="flex-row justify-between items-center mt-1">
//             <View className="flex-row items-center gap-2">
//               <View className="h-1.5 w-8 bg-gray-100 rounded-full overflow-hidden">
//                 <View className="h-full bg-gray-200 rounded-full" style={{ width: `${progressPercent}%` }} />
//               </View>
//               <Text className="text-[10px] font-medium text-gray-400">{completedSub}/{totalSub}</Text>
//             </View>
//             <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
//           </View>
//         </TouchableOpacity>
//       )}

//       {isExpanded && hasSubTasks && !task.isCompleted && (
//         <View className="pl-4 pr-4 pb-4 pt-1 border-t border-gray-50">
//           {task.subTasks!.map((subTask) => (
//             <View key={subTask.id} className="flex-row items-center justify-between py-2 ml-10">
//               <View className="flex-row items-center gap-3">
//                 <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
//                   {/* @ts-ignore */}
//                   <MaterialCommunityIcons name={subTask.icon || 'circle-small'} size={16} color="#6B7280" />
//                 </View>
//                 <Text className={`text-sm font-semibold ${subTask.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{subTask.title}</Text>
//               </View>
//               <TouchableOpacity onPress={() => onSubTaskToggle && onSubTaskToggle(subTask.id)} hitSlop={10}>
//                 {subTask.isCompleted ? (
//                   <Ionicons name="checkmark-circle" size={24} color="#6B7280" />
//                 ) : (
//                   <View className="w-5 h-5 rounded-full border-2 border-black items-center justify-center" />
//                 )}
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       )}
//     </Animated.View>
//   );
// };

// export default function TodayScreen() {
//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isCalendarVisible, setCalendarVisible] = useState(false);
//   const [dailyData, setDailyData] = useState<DailyData>(INITIAL_TASKS);

//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);

//   const actionSheetRef = useRef<BottomSheetModal>(null);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);

//   const [isLayoutExpanded, setLayoutExpanded] = useState(false);
//   const [layoutMode, setLayoutMode] = useState<'compact' | 'timeline'>('compact');

//   const addTaskSheetRef = useRef<BottomSheetModal>(null);



//   const { moveTaskFromTodayToTodo } = useTodo();

//   const stats = useMemo(() => {
//     let totalItems = 0;
//     let completedItems = 0;
//     const countTask = (task: Task) => {
//       totalItems++;
//       if (task.isCompleted) completedItems++;
//       if (task.subTasks) {
//         task.subTasks.forEach(st => {
//           totalItems++;
//           if (st.isCompleted) completedItems++;
//         });
//       }
//     };
//     Object.values(dailyData).forEach(section => section.forEach(countTask));
//     return { total: totalItems, completed: completedItems };
//   }, [dailyData]);

//   const handleToggleParentTask = (task: Task, currentSection: keyof DailyData) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setDailyData((prev) => {
//       const newState = { ...prev };
//       newState[currentSection] = newState[currentSection].filter(t => t.id !== task.id);
//       if (!task.isCompleted) {
//         const updatedTask = { ...task, isCompleted: true, subTasks: task.subTasks?.map(st => ({ ...st, isCompleted: true })) };
//         newState.done = [...newState.done, updatedTask];
//       } else {
//         const updatedTask = { ...task, isCompleted: false };
//         const targetSection = task.originalSection;
//         newState[targetSection] = [...newState[targetSection], updatedTask];
//       }
//       return newState;
//     });
//   };

//   const handleSubTaskToggle = (parentTask: Task, subTaskId: string, currentSection: keyof DailyData) => {
//     setDailyData((prev) => {
//       const newState = { ...prev };
//       const sectionTasks = [...newState[currentSection]];
//       const taskIndex = sectionTasks.findIndex(t => t.id === parentTask.id);
//       if (taskIndex === -1) return prev;

//       const taskToUpdate = { ...sectionTasks[taskIndex] };
//       const updatedSubTasks = taskToUpdate.subTasks?.map(st => {
//         if (st.id === subTaskId) return { ...st, isCompleted: !st.isCompleted };
//         return st;
//       });

//       taskToUpdate.subTasks = updatedSubTasks;
//       const allSubTasksDone = updatedSubTasks?.every(st => st.isCompleted);

//       if (allSubTasksDone) {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         taskToUpdate.isCompleted = true;
//         newState[currentSection] = sectionTasks.filter(t => t.id !== parentTask.id);
//         newState.done = [...newState.done, taskToUpdate];
//       } else {
//         sectionTasks[taskIndex] = taskToUpdate;
//         newState[currentSection] = sectionTasks;
//       }
//       return newState;
//     });
//   };

//   const handleTaskPress = (task: Task) => {
//     setSelectedTask(task);
//     actionSheetRef.current?.present();
//   };


//   const handleEditClick = () => {
//     actionSheetRef.current?.dismiss();
//     setTimeout(() => {
//       // setEditModalVisible(true);
//       setAddTaskModalVisible(true);
//     }, 200);
//   };

//   const handleUpdateTask = (updatedTask: Task) => {
//     setDailyData((prev) => {
//       const newState = { ...prev };

//       const oldSection = selectedTask?.originalSection || 'morning';

//       const taskIndex = newState[oldSection].findIndex(t => t.id === updatedTask.id);

//       if (taskIndex > -1) {
//         newState[oldSection][taskIndex] = updatedTask;
//       } else {
//       }

//       if (updatedTask.originalSection !== oldSection) {
//         newState[oldSection] = newState[oldSection].filter(t => t.id !== updatedTask.id);
//         newState[updatedTask.originalSection].push(updatedTask);
//       }

//       return newState;
//     });
//     setSelectedTask(null);
//   };

//   const handleMakeCopy = () => {
//     actionSheetRef.current?.dismiss();
//     setTimeout(() => {
//       setAddTaskModalVisible(true);
//     }, 200);
//   };

//   const handleSaveTaskCopy = (taskToCopy: Task) => {
//     setDailyData(prev => {
//       const newCopy: Task = {
//         ...taskToCopy,
//         id: `task-copy-${Date.now()}`,
//         title: `${taskToCopy.title} (Copy)`,
//         isCompleted: false,
//         originalSection: 'morning',
//         subTasks: taskToCopy.subTasks?.map(st => ({ ...st, isCompleted: false }))
//       };
//       return { ...prev, morning: [...prev.morning, newCopy] };
//     });
//     setAddTaskModalVisible(false);
//     setSelectedTask(null);
//   };

//   const toggleCalendar = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setCalendarVisible(!isCalendarVisible);
//   };

//   const handleMoveToTodo = () => {
//     if (selectedTask) {
//       moveTaskFromTodayToTodo(selectedTask.title, '📌');
//       handleToggleParentTask(selectedTask, selectedTask.originalSection);
//     }
//     actionSheetRef.current?.dismiss();
//   };

//   const handleAddNewTask = (title: string, priority: string, duration: string) => {
//     setDailyData(prev => {
//       const newTask: Task = {
//         id: `new-${Date.now()}`,
//         title: title,
//         duration: duration,
//         icon: '✨',
//         iconBg: 'bg-gray-100',
//         iconColor: '#333',
//         isCompleted: false,
//         originalSection: 'anytime',
//       };
//       return {
//         ...prev,
//         anytime: [newTask, ...prev.anytime]
//       };
//     });
//   };

//   const handleOpenDetailedAdd = (currentTitle: string) => {
//     const tempTask: Task = {
//       id: `temp-${Date.now()}`,
//       title: currentTitle,
//       duration: '15m',
//       icon: '✨',
//       iconBg: 'bg-gray-100',
//       iconColor: '#6B7280',
//       isCompleted: false,
//       originalSection: 'anytime'
//     };

//     setSelectedTask(tempTask);

//     setTimeout(() => {
//       setAddTaskModalVisible(true);
//     }, 100);
//   };


//   return (
//     <MenuProvider>
//       <View className="flex-1 bg-[#FDFAFA]">
//         <SafeAreaView className="flex-1" edges={['top']}>
//           <View className="py-2">
//             <View className="flex-row justify-between items-center mb-6 px-5">
//               <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 gap-2">
//                 <MaterialCommunityIcons name="party-popper" size={16} color="black" />
//                 <Text className="text-xs font-bold">{stats.completed} / {stats.total}</Text>
//               </View>
//               <View className="flex-row gap-3">

//                 <Menu>
//                   <MenuTrigger>
//                     <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
//                       <Ionicons name="ellipsis-horizontal" size={20} color="black" />
//                     </View>
//                   </MenuTrigger>
//                   <MenuOptions customStyles={{
//                     optionsContainer: {
//                       borderRadius: 20,
//                       width: 240,
//                       marginTop: 40,
//                       paddingVertical: 8,
//                       backgroundColor: 'white',
//                       shadowColor: "#000",
//                       shadowOffset: { width: 0, height: 4 },
//                       shadowOpacity: 0.1,
//                       shadowRadius: 10,
//                       elevation: 5,
//                     }
//                   }}>

//                     <MenuOption onSelect={() => router.push('/home-screens/reschedule')} style={{ padding: 12 }}>
//                       <View className="flex-row items-center gap-3">
//                         <MaterialCommunityIcons name="calendar-clock" size={20} color="black" />
//                         <Text className="text-base font-medium text-black">Reschedule tasks</Text>
//                       </View>
//                     </MenuOption>
//                     <MenuOption onSelect={() => router.push('/home-screens/explore')} style={{ padding: 12 }}>
//                       <View className="flex-row items-center gap-3">
//                         <Ionicons name="search-outline" size={20} color="black" />
//                         <Text className="text-base font-medium text-black">Explore routines</Text>
//                       </View>
//                     </MenuOption>
//                     <MenuOption onSelect={() => { }} style={{ padding: 12 }}>
//                       <View className="flex-row items-center gap-3">
//                         <Ionicons name="heart-circle-outline" size={22} color="black" />
//                         <Text className="text-base font-medium text-black">Log mood</Text>
//                       </View>
//                     </MenuOption>

//                     <View className="h-[1px] bg-gray-100 my-1 mx-3" />
//                     <TouchableOpacity
//                       activeOpacity={0.7}
//                       onPress={() => setLayoutExpanded(!isLayoutExpanded)}
//                       style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
//                     >
//                       <Text className="text-base font-medium text-black">Layout options</Text>
//                       <Ionicons name={isLayoutExpanded ? "chevron-down" : "chevron-forward"} size={18} color="gray" />
//                     </TouchableOpacity>

//                     {isLayoutExpanded && (
//                       <View>
//                         <View className="h-[1px] bg-gray-50 mx-4 mb-2" />

//                         {/* Compact */}
//                         <MenuOption onSelect={() => setLayoutMode('compact')} style={{ paddingLeft: 20, paddingVertical: 10 }}>
//                           <View className="flex-row items-center gap-3">
//                             <View style={{ width: 20 }}>
//                               {layoutMode === 'compact' && <Ionicons name="checkmark" size={18} color="black" />}
//                             </View>
//                             <MaterialCommunityIcons name="tune-variant" size={20} color="black" />
//                             <Text className="text-base text-black">Compact</Text>
//                           </View>
//                         </MenuOption>

//                         {/* Timeline */}
//                         <MenuOption onSelect={() => setLayoutMode('timeline')} style={{ paddingLeft: 20, paddingVertical: 10 }}>
//                           <View className="flex-row items-center gap-3">
//                             <View style={{ width: 20 }}>
//                               {layoutMode === 'timeline' && <Ionicons name="checkmark" size={18} color="black" />}
//                             </View>
//                             <MaterialCommunityIcons name="view-day-outline" size={20} color="black" />
//                             <Text className="text-base text-black">Timeline</Text>
//                           </View>
//                         </MenuOption>
//                       </View>
//                     )}
//                   </MenuOptions>
//                 </Menu>


//                 <TouchableOpacity
//                   onPress={() => addTaskSheetRef.current?.present()}
//                   className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
//                 >
//                   <Ionicons name="add" size={24} color="black" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity onPress={toggleCalendar} activeOpacity={0.7} className="items-center mt-4">
//               <Text className="text-4xl text-black mb-1 text-center" style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}>
//                 {format(selectedDate, 'EEEE')}
//               </Text>
//               <View className="flex-row items-center gap-1">
//                 <Text className="text-gray-500 font-medium text-sm">{format(selectedDate, 'MMMM do, yyyy')}</Text>
//                 <Ionicons name={isCalendarVisible ? "chevron-up" : "chevron-down"} size={14} color="#9CA3AF" />
//               </View>
//             </TouchableOpacity>

//             {isCalendarVisible && (
//               <View className="w-full mt-8">
//                 <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
//               </View>
//             )}
//           </View>

//           <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
//             <View className="bg-[#F2F2F7] p-4 rounded-2xl flex-row items-center gap-4 mb-6 relative">
//               <View className="w-10 items-center justify-center">
//                 <MaterialCommunityIcons name="gesture-pinch" size={32} color="#1C1C1E" />
//               </View>
//               <View className="flex-1">
//                 <Text className="font-bold text-gray-900 text-sm mb-0.5">Pinch for list view</Text>
//                 <Text className="text-xs text-gray-500 leading-4">Pinch with two fingers to switch between timeline and list views.</Text>
//               </View>
//               <TouchableOpacity className="absolute top-3 right-3 bg-gray-200/50 rounded-full p-0.5">
//                 <Ionicons name="close" size={14} color="#8E8E93" />
//               </TouchableOpacity>
//             </View>

//             {['Anytime', 'Morning', 'Afternoon', 'Evening'].map((label) => {
//               const key = label.toLowerCase() as keyof DailyData;
//               const tasks = dailyData[key];
//               if (key === 'done') return null;

//               return (
//                 <View key={key}>
//                   <SectionHeader label={label} count={tasks.length} />
//                   {tasks.length > 0 ? (
//                     tasks.map(task => (
//                       <DynamicTaskCard
//                         key={task.id}
//                         task={task}
//                         onPress={() => handleTaskPress(task)}
//                         onToggle={() => handleToggleParentTask(task, key)}
//                         onSubTaskToggle={(subId) => handleSubTaskToggle(task, subId, key)}
//                       />
//                     ))
//                   ) : (
//                     <EmptySlot placeholder={`${label} tasks here`} />
//                   )}
//                 </View>
//               )
//             })}

//             {dailyData.done.length > 0 && (
//               <View className="mt-4">
//                 <SectionHeader label="Done" count={dailyData.done.length} />
//                 {dailyData.done.map(task => (
//                   <DynamicTaskCard key={task.id} task={task} onPress={() => handleTaskPress(task)} onToggle={() => handleToggleParentTask(task, 'done')} />
//                 ))}
//               </View>
//             )}
//           </ScrollView>

//           <TaskActionSheet
//             ref={actionSheetRef}
//             onMakeCopy={handleMakeCopy}
//             onMoveToTodo={handleMoveToTodo}
//             onEdit={handleEditClick}
//           />


//           <AddTaskSheet
//             ref={addTaskSheetRef}
//             onAddTask={handleAddNewTask}
//             onOpenDetails={handleOpenDetailedAdd}
//           />


//           {selectedTask && (
//             <>
//               <AddTaskModal
//                 visible={isAddTaskModalVisible}
//                 onClose={() => setAddTaskModalVisible(false)}
//                 onSave={handleSaveTaskCopy} initialTask={selectedTask} />
//             </>
//           )}
//           <EditTaskModal
//             visible={isEditModalVisible}
//             task={selectedTask}
//             onSave={handleUpdateTask}
//             onClose={() => setEditModalVisible(false)}
//           />
//         </SafeAreaView>
//       </View>
//     </MenuProvider>

//   );
// }


// import AddTaskModal from '@/components/AddTaskModal';
// import AddTaskSheet from '@/components/AddTaskSheet';
// import EditTaskModal from '@/components/EditTaskModal';
// import TaskActionSheet from '@/components/TaskActionSheet';
// import TaskList from '@/components/today/TaskList';
// import TodayHeader from '@/components/today/TodayHeader';
// import { DailyData, INITIAL_TASKS, Task } from '@/constants'; // Import from constants
// import { useTodo } from '@/context/TodoContext';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import React, { useMemo, useRef, useState } from 'react';
// import { LayoutAnimation, Platform, UIManager, View } from 'react-native';
// import { MenuProvider } from "react-native-popup-menu";
// import { SafeAreaView } from 'react-native-safe-area-context';

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function TodayScreen() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [dailyData, setDailyData] = useState<DailyData>(INITIAL_TASKS);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);

//   const actionSheetRef = useRef<BottomSheetModal>(null);
//   const addTaskSheetRef = useRef<BottomSheetModal>(null);
//   const editTaskRef = useRef<BottomSheetModal>(null);

//   const { moveTaskFromTodayToTodo } = useTodo();

//   // --- Stats Logic ---
//   const stats = useMemo(() => {
//     let totalItems = 0;
//     let completedItems = 0;
//     const countTask = (task: Task) => {
//       totalItems++;
//       if (task.isCompleted) completedItems++;
//       if (task.subTasks) {
//         task.subTasks.forEach(st => {
//           totalItems++;
//           if (st.isCompleted) completedItems++;
//         });
//       }
//     };
//     Object.values(dailyData).forEach(section => section.forEach(countTask));
//     return { total: totalItems, completed: completedItems };
//   }, [dailyData]);

//   // --- Task Handlers ---
//   const handleToggleParentTask = (task: Task, currentSection: keyof DailyData) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setDailyData((prev) => {
//       const newState = { ...prev };
//       newState[currentSection] = newState[currentSection].filter(t => t.id !== task.id);
//       if (!task.isCompleted) {
//         const updatedTask = { ...task, isCompleted: true, subTasks: task.subTasks?.map(st => ({ ...st, isCompleted: true })) };
//         newState.done = [...newState.done, updatedTask];
//       } else {
//         const updatedTask = { ...task, isCompleted: false };
//         const targetSection = task.originalSection;
//         newState[targetSection] = [...newState[targetSection], updatedTask];
//       }
//       return newState;
//     });
//   };

//   const handleSubTaskToggle = (parentTask: Task, subTaskId: string, currentSection: keyof DailyData) => {
//     setDailyData((prev) => {
//       const newState = { ...prev };
//       const sectionTasks = [...newState[currentSection]];
//       const taskIndex = sectionTasks.findIndex(t => t.id === parentTask.id);
//       if (taskIndex === -1) return prev;

//       const taskToUpdate = { ...sectionTasks[taskIndex] };
//       const updatedSubTasks = taskToUpdate.subTasks?.map(st => {
//         if (st.id === subTaskId) return { ...st, isCompleted: !st.isCompleted };
//         return st;
//       });

//       taskToUpdate.subTasks = updatedSubTasks;
//       const allSubTasksDone = updatedSubTasks?.every(st => st.isCompleted);

//       if (allSubTasksDone) {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         taskToUpdate.isCompleted = true;
//         newState[currentSection] = sectionTasks.filter(t => t.id !== parentTask.id);
//         newState.done = [...newState.done, taskToUpdate];
//       } else {
//         sectionTasks[taskIndex] = taskToUpdate;
//         newState[currentSection] = sectionTasks;
//       }
//       return newState;
//     });
//   };

//   const handleTaskPress = (task: Task) => {
//     setSelectedTask(task);
//     actionSheetRef.current?.present();
//   };

//   const handleEditClick = () => {
//     actionSheetRef.current?.dismiss();
//     setTimeout(() => setAddTaskModalVisible(true), 200);
//   };

//   const handleUpdateTask = (updatedTask: Task) => {
//     setDailyData((prev) => {
//       const newState = { ...prev };
//       const oldSection = selectedTask?.originalSection || 'morning';
//       const taskIndex = newState[oldSection].findIndex(t => t.id === updatedTask.id);
//       if (taskIndex > -1) newState[oldSection][taskIndex] = updatedTask;
//       if (updatedTask.originalSection !== oldSection) {
//         newState[oldSection] = newState[oldSection].filter(t => t.id !== updatedTask.id);
//         newState[updatedTask.originalSection].push(updatedTask);
//       }
//       return newState;
//     });
//     setSelectedTask(null);
//   };

//   const handleMakeCopy = () => {
//     actionSheetRef.current?.dismiss();
//     setTimeout(() => setAddTaskModalVisible(true), 200);
//   };

//   const handleSaveTaskCopy = (taskToCopy: Task) => {
//     setDailyData(prev => {
//       const newCopy: Task = {
//         ...taskToCopy,
//         id: `task-copy-${Date.now()}`,
//         title: `${taskToCopy.title} (Copy)`,
//         isCompleted: false,
//         originalSection: 'morning',
//         subTasks: taskToCopy.subTasks?.map(st => ({ ...st, isCompleted: false }))
//       };
//       return { ...prev, morning: [...prev.morning, newCopy] };
//     });
//     setAddTaskModalVisible(false);
//     setSelectedTask(null);
//   };

//   const handleMoveToTodo = () => {
//     if (selectedTask) {
//       moveTaskFromTodayToTodo(selectedTask.title, '📌');
//       handleToggleParentTask(selectedTask, selectedTask.originalSection);
//     }
//     actionSheetRef.current?.dismiss();
//   };

//   const handleAddNewTask = (title: string, priority: string, duration: string) => {
//     setDailyData(prev => {
//       const newTask: Task = {
//         id: `new-${Date.now()}`,
//         title: title,
//         duration: duration,
//         icon: '✨',
//         iconBg: 'bg-gray-100',
//         iconColor: '#333',
//         isCompleted: false,
//         originalSection: 'anytime',
//       };
//       return {
//         ...prev,
//         anytime: [newTask, ...prev.anytime]
//       };
//     });
//   };

//   const handleOpenDetailedAdd = (currentTitle: string) => {
//     const tempTask: Task = {
//       id: `temp-${Date.now()}`,
//       title: currentTitle,
//       duration: '15m',
//       icon: '✨',
//       iconBg: 'bg-gray-100',
//       iconColor: '#6B7280',
//       isCompleted: false,
//       originalSection: 'anytime'
//     };
//     setSelectedTask(tempTask);
//     setTimeout(() => setAddTaskModalVisible(true), 100);
//   };

//   return (
//     <MenuProvider>
//       <View className="flex-1 bg-[#FDFAFA]">
//         <SafeAreaView className="flex-1" edges={['top']}>

//           {/* Header Component */}
//           <TodayHeader
//             stats={stats}
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//             onAddPress={() => addTaskSheetRef.current?.present()}
//           />

//           {/* Task List Component */}
//           <TaskList
//             dailyData={dailyData}
//             onTaskPress={handleTaskPress}
//             onToggleParentTask={handleToggleParentTask}
//             onSubTaskToggle={handleSubTaskToggle}
//           />

//           {/* Modals & Sheets */}
//           <TaskActionSheet
//             ref={actionSheetRef}
//             onMakeCopy={handleMakeCopy}
//             onMoveToTodo={handleMoveToTodo}
//             onEdit={handleEditClick}
//           />

//           <AddTaskSheet
//             ref={addTaskSheetRef}
//             onAddTask={handleAddNewTask}
//             onOpenDetails={handleOpenDetailedAdd}
//           />

//           {selectedTask && (
//             <AddTaskModal
//               visible={isAddTaskModalVisible}
//               onClose={() => setAddTaskModalVisible(false)}
//               onSave={handleSaveTaskCopy}
//               initialTask={selectedTask}
//             />
//           )}

//           <EditTaskModal
//             visible={isEditModalVisible}
//             task={selectedTask}
//             onSave={handleUpdateTask}
//             onClose={() => setEditModalVisible(false)}
//           />
//         </SafeAreaView>
//       </View>
//     </MenuProvider>
//   );
// }



import AddTaskModal from '@/components/AddTaskModal';
import AddTaskSheet from '@/components/AddTaskSheet';
import EditTaskModal from '@/components/EditTaskModal';
import TaskActionSheet from '@/components/TaskActionSheet';
import TaskList from '@/components/today/TaskList';
import TodayHeader from '@/components/today/TodayHeader';
import { DailyData, INITIAL_TASKS, Task } from '@/constants'; // Import from constants
import { useTodo } from '@/context/TodoContext';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import { LayoutAnimation, Platform, UIManager, View } from 'react-native';
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TodayScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState<DailyData>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'copy'>('add');


  const actionSheetRef = useRef<BottomSheetModal>(null);
  const addTaskSheetRef = useRef<BottomSheetModal>(null);
  const editTaskRef = useRef<BottomSheetModal>(null);

  const { moveTaskFromTodayToTodo } = useTodo();

  // --- Stats Logic ---
  const stats = useMemo(() => {
    let totalItems = 0;
    let completedItems = 0;
    const countTask = (task: Task) => {
      totalItems++;
      if (task.isCompleted) completedItems++;
      if (task.subTasks) {
        task.subTasks.forEach(st => {
          totalItems++;
          if (st.isCompleted) completedItems++;
        });
      }
    };
    Object.values(dailyData).forEach(section => section.forEach(countTask));
    return { total: totalItems, completed: completedItems };
  }, [dailyData]);

  // --- Task Handlers ---
  const handleToggleParentTask = (task: Task, currentSection: keyof DailyData) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDailyData((prev) => {
      const newState = { ...prev };
      newState[currentSection] = newState[currentSection].filter(t => t.id !== task.id);
      if (!task.isCompleted) {
        const updatedTask = { ...task, isCompleted: true, subTasks: task.subTasks?.map(st => ({ ...st, isCompleted: true })) };
        newState.done = [...newState.done, updatedTask];
      } else {
        const updatedTask = { ...task, isCompleted: false };
        const targetSection = task.originalSection;
        newState[targetSection] = [...newState[targetSection], updatedTask];
      }
      return newState;
    });
  };

  const handleSubTaskToggle = (parentTask: Task, subTaskId: string, currentSection: keyof DailyData) => {
    setDailyData((prev) => {
      const newState = { ...prev };
      const sectionTasks = [...newState[currentSection]];
      const taskIndex = sectionTasks.findIndex(t => t.id === parentTask.id);
      if (taskIndex === -1) return prev;

      const taskToUpdate = { ...sectionTasks[taskIndex] };
      const updatedSubTasks = taskToUpdate.subTasks?.map(st => {
        if (st.id === subTaskId) return { ...st, isCompleted: !st.isCompleted };
        return st;
      });

      taskToUpdate.subTasks = updatedSubTasks;
      const allSubTasksDone = updatedSubTasks?.every(st => st.isCompleted);

      if (allSubTasksDone) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        taskToUpdate.isCompleted = true;
        newState[currentSection] = sectionTasks.filter(t => t.id !== parentTask.id);
        newState.done = [...newState.done, taskToUpdate];
      } else {
        sectionTasks[taskIndex] = taskToUpdate;
        newState[currentSection] = sectionTasks;
      }
      return newState;
    });
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    actionSheetRef.current?.present();
  };

  const handleEditClick = () => {
    actionSheetRef.current?.dismiss();
    setModalMode('edit'); // Set mode
    // selectedTask is already set by handleTaskPress
    setTimeout(() => setAddTaskModalVisible(true), 200);
  };

  // 3. Updated: Handle "Make Copy" action
  const handleMakeCopy = () => {
    actionSheetRef.current?.dismiss();
    if (selectedTask) {
      // Pre-modify the task for copy mode
      const copyTask = {
        ...selectedTask,
        title: `${selectedTask.title} (Copy)`,
        id: `copy-${Date.now()}` // Temporary new ID
      };
      setSelectedTask(copyTask);
      setModalMode('copy'); // Set mode
      setTimeout(() => setAddTaskModalVisible(true), 200);
    }
  };


  const handleSaveFromModal = (taskData: Task) => {
    if (modalMode === 'edit') {
      // UPDATE EXISTING TASK
      setDailyData((prev) => {
        const newState = { ...prev };

        // Note: In a real app, 'originalSection' should verify where it actually is
        // Here we search for it to be safe or use originalSection from the task data if we trust it wasn't moved yet

        // Simple approach: Remove old, Add new (handles section changes too)
        let found = false;
        (Object.keys(newState) as Array<keyof DailyData>).forEach(key => {
          const idx = newState[key].findIndex(t => t.id === taskData.id);
          if (idx > -1) {
            newState[key].splice(idx, 1); // Remove
            found = true;
          }
        });

        // Add updated task to its (potentially new) section
        const targetSection = taskData.originalSection;
        newState[targetSection] = [...newState[targetSection], taskData];

        return newState;
      });
    } else {
      // CREATE NEW TASK (Add or Copy)
      setDailyData((prev) => {
        const newTask = {
          ...taskData,
          id: modalMode === 'copy' ? `copy-${Date.now()}` : `new-${Date.now()}`,
          isCompleted: false
        };
        const targetSection = newTask.originalSection;
        return {
          ...prev,
          [targetSection]: [newTask, ...prev[targetSection]]
        };
      });
    }

    setAddTaskModalVisible(false);
    setSelectedTask(null);
  };

  // const handleEditClick = () => {
  //   actionSheetRef.current?.dismiss();
  //   setTimeout(() => setAddTaskModalVisible(true), 200);
  // };

  const handleUpdateTask = (updatedTask: Task) => {
    setDailyData((prev) => {
      const newState = { ...prev };
      const oldSection = selectedTask?.originalSection || 'morning';
      const taskIndex = newState[oldSection].findIndex(t => t.id === updatedTask.id);
      if (taskIndex > -1) newState[oldSection][taskIndex] = updatedTask;
      if (updatedTask.originalSection !== oldSection) {
        newState[oldSection] = newState[oldSection].filter(t => t.id !== updatedTask.id);
        newState[updatedTask.originalSection].push(updatedTask);
      }
      return newState;
    });
    setSelectedTask(null);
  };

  // const handleMakeCopy = () => {
  //   actionSheetRef.current?.dismiss();
  //   setTimeout(() => setAddTaskModalVisible(true), 200);
  // };

  const handleSaveTaskCopy = (taskToCopy: Task) => {
    setDailyData(prev => {
      const newCopy: Task = {
        ...taskToCopy,
        id: `task-copy-${Date.now()}`,
        title: `${taskToCopy.title} (Copy)`,
        isCompleted: false,
        originalSection: 'morning',
        subTasks: taskToCopy.subTasks?.map(st => ({ ...st, isCompleted: false }))
      };
      return { ...prev, morning: [...prev.morning, newCopy] };
    });
    setAddTaskModalVisible(false);
    setSelectedTask(null);
  };

  const handleMoveToTodo = () => {
    if (selectedTask) {
      moveTaskFromTodayToTodo(selectedTask.title, '📌');
      handleToggleParentTask(selectedTask, selectedTask.originalSection);
    }
    actionSheetRef.current?.dismiss();
  };

  const handleAddNewTask = (title: string, priority: string, duration: string) => {
    setDailyData(prev => {
      const newTask: Task = {
        id: `new-${Date.now()}`,
        title: title,
        duration: duration,
        icon: '✨',
        iconBg: 'bg-gray-100',
        iconColor: '#333',
        isCompleted: false,
        originalSection: 'anytime',
      };
      return {
        ...prev,
        anytime: [newTask, ...prev.anytime]
      };
    });
  };

  const handleOpenDetailedAdd = (currentTitle: string) => {
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
    setTimeout(() => setAddTaskModalVisible(true), 100);
  };


  const handleDeleteTask = () => {
    if (selectedTask) {
      // Reuse the Toggle Parent logic to remove it from the list
      // Or create a specific delete function if you want different behavior (like no animation)
      handleToggleParentTask(selectedTask, selectedTask.originalSection);
    }
  };

  return (
    <MenuProvider>
      <View className="flex-1 bg-[#FDFAFA]">
        <SafeAreaView className="flex-1" edges={['top']}>

          {/* Header Component */}
          <TodayHeader
            stats={stats}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onAddPress={() => addTaskSheetRef.current?.present()}
          />

          {/* Task List Component */}
          <TaskList
            dailyData={dailyData}
            onTaskPress={handleTaskPress}
            onToggleParentTask={handleToggleParentTask}
            onSubTaskToggle={handleSubTaskToggle}
          />

          {/* Modals & Sheets */}
          <TaskActionSheet
            ref={actionSheetRef}
            onMakeCopy={handleMakeCopy}
            onMoveToTodo={handleMoveToTodo}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />

          <AddTaskSheet
            ref={addTaskSheetRef}
            onAddTask={handleAddNewTask}
            onOpenDetails={handleOpenDetailedAdd}
          />

          {selectedTask && (
            <AddTaskModal
              visible={isAddTaskModalVisible}
              onClose={() => setAddTaskModalVisible(false)}
              onSave={handleSaveFromModal}
              initialTask={selectedTask}
            />
          )}

          <EditTaskModal
            visible={isEditModalVisible}
            task={selectedTask}
            onSave={handleUpdateTask}
            onClose={() => setEditModalVisible(false)}
          />
        </SafeAreaView>
      </View>
    </MenuProvider>
  );
}