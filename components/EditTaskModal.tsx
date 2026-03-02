// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { format } from 'date-fns';
// import React, { useEffect, useState } from 'react';
// import {
//     Keyboard,
//     KeyboardAvoidingView,
//     Modal,
//     Platform,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { Task } from '@/app/(tabs)/index';

// type EditTaskModalProps = {
//   visible: boolean;
//   task: Task | null;
//   onSave: (updatedTask: Task) => void;
//   onClose: () => void;
// };

// const SECTIONS = [
//   { id: 'anytime', label: 'Anytime', icon: 'time-outline' },
//   { id: 'morning', label: 'Morning', icon: 'sunny-outline' },
//   { id: 'afternoon', label: 'Afternoon', icon: 'sunny' },
//   { id: 'evening', label: 'Evening', icon: 'moon-outline' },
//   { id: 'at_time', label: 'At time', icon: 'calendar-outline' },
// ];

// export default function EditTaskModal({ visible, task, onSave, onClose }: EditTaskModalProps) {
//   const insets = useSafeAreaInsets();

//   const [title, setTitle] = useState('');
//   const [section, setSection] = useState('morning');
//   const [date, setDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 10 * 60000));
//   const [duration, setDuration] = useState('10m');

//   const [showSectionMenu, setShowSectionMenu] = useState(false);
//   const [showUpdateMenu, setShowUpdateMenu] = useState(false);
//   const [pickerMode, setPickerMode] = useState<'date' | 'time' | null>(null);
//   const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | 'date'>('date');

//   useEffect(() => {
//     if (task && visible) {
//       setTitle(task.title);
//       setSection(task.originalSection);
//       setDuration(task.duration);
//       setShowSectionMenu(false);
//       setShowUpdateMenu(false);
//     }
//   }, [task, visible]);

//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     if (Platform.OS === 'android') setPickerMode(null);
//     if (selectedDate) {
//       if (pickerTarget === 'date') setDate(selectedDate);
//       if (pickerTarget === 'start') setStartTime(selectedDate);
//       if (pickerTarget === 'end') setEndTime(selectedDate);
//     }
//   };

//   const openPicker = (mode: 'date' | 'time', target: 'date' | 'start' | 'end') => {
//     setPickerTarget(target);
//     setPickerMode(mode);
//   };

//   const handlePreSave = () => {
//     Keyboard.dismiss();
//     setShowUpdateMenu(true);
//   };

//   const handleFinalSave = () => {
//     if (!task) return;

//     let finalDuration = duration;
//     if (section === 'at_time') {
//       finalDuration = `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
//     }

//     const updatedTask: Task = {
//       ...task,
//       title,
//       duration: finalDuration,
//       originalSection: (section === 'at_time' ? 'afternoon' : section) as any,
//     };

//     onSave(updatedTask);
//     setShowUpdateMenu(false);
//     onClose();
//   };

//   const activeSectionLabel = SECTIONS.find(s => s.id === section)?.label || 'Morning';
//   const activeSectionIcon = SECTIONS.find(s => s.id === section)?.icon || 'sunny-outline';

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={onClose}
//     >
//       <KeyboardAvoidingView
//         className="flex-1 bg-[#F2F2F7]"
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <View style={{ paddingTop: insets.top }} className="flex-1">

//           {/* Header */}
//           <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200/50">
//             <TouchableOpacity
//               onPress={onClose}
//               className="w-10 h-10 bg-white rounded-full items-center justify-center"
//             >
//               <Ionicons name="close" size={24} color="black" />
//             </TouchableOpacity>
//             <Text className="text-base font-bold text-gray-900">Edit task</Text>
//             <TouchableOpacity
//               onPress={handlePreSave}
//               className="w-10 h-10 bg-[#8B7EFF] rounded-full items-center justify-center"
//             >
//               <Ionicons name="checkmark" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             className="flex-1 px-4 pt-6"
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 120 }}
//           >
//             {/* Title Input */}
//             <View className="bg-white rounded-2xl p-4 mb-6 flex-row items-center justify-between">
//               <TextInput
//                 value={title}
//                 onChangeText={setTitle}
//                 style={{
//                   fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
//                   fontSize: 20,
//                   flex: 1,
//                   color: '#1C1C1E',
//                 }}
//                 placeholder="Task name"
//                 placeholderTextColor="#9CA3AF"
//               />
//               <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center">
//                 <MaterialCommunityIcons name="pencil" size={16} color="#EAB308" />
//               </View>
//             </View>

//             {/* Form Fields */}
//             <View className="bg-white rounded-2xl p-4 gap-6 mb-6">

//               {/* Time of Day */}
//               <View className="flex-row justify-between items-center z-20">
//                 <Text className="text-base font-medium text-gray-900">Time of day</Text>
//                 <View>
//                   <TouchableOpacity
//                     onPress={() => setShowSectionMenu(!showSectionMenu)}
//                     className="flex-row items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
//                   >
//                     <Ionicons name={activeSectionIcon as any} size={16} color="black" />
//                     <Text className="text-sm font-medium">{activeSectionLabel}</Text>
//                   </TouchableOpacity>

//                   {showSectionMenu && (
//                     <View className="absolute top-10 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-48 z-50">
//                       {SECTIONS.map((s) => (
//                         <TouchableOpacity
//                           key={s.id}
//                           onPress={() => {
//                             setSection(s.id);
//                             setShowSectionMenu(false);
//                           }}
//                           className="flex-row items-center gap-3 p-3 rounded-xl active:bg-gray-50"
//                         >
//                           <Ionicons name={s.icon as any} size={18} color="gray" />
//                           <Text className="text-sm font-medium text-gray-800">{s.label}</Text>
//                           {section === s.id && (
//                             <Ionicons name="checkmark" size={16} color="black" style={{ marginLeft: 'auto' }} />
//                           )}
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               </View>

//               {section === 'at_time' ? (
//                 <>
//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-base font-medium text-gray-900">Date</Text>
//                     <TouchableOpacity
//                       onPress={() => openPicker('date', 'date')}
//                       className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2"
//                     >
//                       <Ionicons name="calendar-outline" size={16} color="black" />
//                       <Text className="text-sm font-medium">{format(date, 'MMM dd, yyyy')}</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-base font-medium text-gray-900">Starts</Text>
//                     <TouchableOpacity
//                       onPress={() => openPicker('time', 'start')}
//                       className="bg-gray-100 px-3 py-1.5 rounded-lg"
//                     >
//                       <Text className="text-sm font-medium">{format(startTime, 'h:mm a')}</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-base font-medium text-gray-900">Ends</Text>
//                     <TouchableOpacity
//                       onPress={() => openPicker('time', 'end')}
//                       className="bg-gray-100 px-3 py-1.5 rounded-lg"
//                     >
//                       <Text className="text-sm font-medium">{format(endTime, 'h:mm a')}</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-base font-medium text-gray-900">Date</Text>
//                     <TouchableOpacity
//                       onPress={() => openPicker('date', 'date')}
//                       className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2"
//                     >
//                       <Ionicons name="calendar-outline" size={16} color="black" />
//                       <Text className="text-sm font-medium">{format(date, 'MMM dd, yyyy')}</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View className="flex-row justify-between items-center">
//                     <Text className="text-base font-medium text-gray-900">Duration</Text>
//                     <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
//                       <Ionicons name="time-outline" size={16} color="black" />
//                       <Text className="text-sm font-medium">{duration}</Text>
//                     </View>
//                   </View>
//                 </>
//               )}

//               <View className="flex-row justify-between items-center">
//                 <Text className="text-base font-medium text-gray-900">Repeat</Text>
//                 <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
//                   <Ionicons name="repeat" size={16} color="black" />
//                   <Text className="text-sm font-medium">M, T, W, T, F every week</Text>
//                 </View>
//               </View>
//             </View>

//             {/* Subtasks */}
//             <View className="bg-white rounded-2xl p-4 mb-6">
//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-base font-medium text-gray-900">Sub-tasks</Text>
//                 <View className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
//                   <Text className="text-[10px] font-bold text-gray-900">SUGGEST BREAKDOWN</Text>
//                   <MaterialCommunityIcons name="magic-staff" size={14} color="#8B5CF6" />
//                 </View>
//               </View>
//               <View className="border border-dashed border-gray-200 p-3 rounded-xl items-center">
//                 <Text className="text-xs font-bold text-gray-400">ADD NEW +</Text>
//               </View>
//             </View>

//             {/* Notes */}
//             <View className="bg-white rounded-2xl p-4 h-32">
//               <TextInput
//                 placeholder="Write your notes here..."
//                 placeholderTextColor="#9CA3AF"
//                 multiline
//                 style={{ fontSize: 16, color: '#1C1C1E', flex: 1 }}
//               />
//             </View>
//           </ScrollView>

//           {/* Footer */}
//           <View
//             style={{ paddingBottom: insets.bottom + 16 }}
//             className="absolute bottom-0 left-4 right-4 flex-row justify-between items-center"
//           >
//             <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
//               <Ionicons name="trash-outline" size={20} color="#EF4444" />
//             </TouchableOpacity>
//             <TouchableOpacity className="bg-white px-6 py-3 rounded-full shadow-sm">
//               <Text className="font-bold text-gray-900">Start task</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Date/Time Picker */}
//           {pickerMode && (
//             <DateTimePicker
//               value={pickerTarget === 'date' ? date : pickerTarget === 'start' ? startTime : endTime}
//               mode={pickerMode}
//               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//               onChange={handleDateChange}
//             />
//           )}

//           {/* Update Confirmation */}
//           <Modal visible={showUpdateMenu} transparent animationType="fade">
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={() => setShowUpdateMenu(false)}
//               className="flex-1 bg-black/20 items-end pr-4 pt-20"
//             >
//               <View className="bg-white/90 rounded-2xl p-2 w-64 shadow-xl">
//                 <Text className="text-center py-3 text-sm font-medium border-b border-gray-200">
//                   Update '{title}'
//                 </Text>
//                 {['Update this only', 'Update all future', 'Update all'].map((label, i) => (
//                   <View key={label}>
//                     {i > 0 && <View className="h-[1px] bg-gray-200" />}
//                     <TouchableOpacity onPress={handleFinalSave} className="py-3 items-center active:bg-gray-100 rounded-lg">
//                       <Text className="text-base text-gray-900">{label}</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>
//             </TouchableOpacity>
//           </Modal>

//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }


import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Task } from '@/app/(tabs)/index';

type EditTaskModalProps = {
  visible: boolean;
  task: Task | null;
  onSave: (updatedTask: Task) => void;
  onClose: () => void;
};

const SECTIONS = [
  { id: 'anytime', label: 'Anytime', icon: 'time-outline' },
  { id: 'morning', label: 'Morning', icon: 'sunny-outline' },
  { id: 'afternoon', label: 'Afternoon', icon: 'sunny' },
  { id: 'evening', label: 'Evening', icon: 'moon-outline' },
  { id: 'at_time', label: 'At time', icon: 'calendar-outline' },
];

export default function EditTaskModal({ visible, task, onSave, onClose }: EditTaskModalProps) {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [section, setSection] = useState('morning');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 10 * 60000));
  const [duration, setDuration] = useState('10m');
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time' | null>(null);
  const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | 'date'>('date');

  useEffect(() => {
    if (task && visible) {
      setTitle(task.title);
      setSection(task.originalSection);
      setDuration(task.duration);
      setShowUpdateMenu(false);
    }
  }, [task, visible]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setPickerMode(null);
    if (selectedDate) {
      if (pickerTarget === 'date') setDate(selectedDate);
      if (pickerTarget === 'start') setStartTime(selectedDate);
      if (pickerTarget === 'end') setEndTime(selectedDate);
    }
  };

  const openPicker = (mode: 'date' | 'time', target: 'date' | 'start' | 'end') => {
    setPickerTarget(target);
    setPickerMode(mode);
  };

  const handlePreSave = () => {
    Keyboard.dismiss();
    setShowUpdateMenu(true);
  };

  const handleFinalSave = () => {
    if (!task) return;

    let finalDuration = duration;
    if (section === 'at_time') {
      finalDuration = `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
    }

    const updatedTask: Task = {
      ...task,
      title,
      duration: finalDuration,
      originalSection: (section === 'at_time' ? 'afternoon' : section) as any,
    };

    onSave(updatedTask);
    setShowUpdateMenu(false);
    onClose();
  };

  const activeSectionLabel = SECTIONS.find(s => s.id === section)?.label || 'Morning';
  const activeSectionIcon = SECTIONS.find(s => s.id === section)?.icon || 'sunny-outline';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-[#F2F2F7]"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ paddingTop: insets.top }} className="flex-1">

          {/* Header */}
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200/50">
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 bg-white rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-base font-bold text-gray-900">Edit task</Text>
            <TouchableOpacity
              onPress={handlePreSave}
              className="w-10 h-10 bg-[#8B7EFF] rounded-full items-center justify-center"
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 px-4 pt-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Title Input */}
            <View className="bg-white rounded-2xl p-4 mb-6 flex-row items-center justify-between">
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
                  fontSize: 20,
                  flex: 1,
                  color: '#1C1C1E',
                }}
                placeholder="Task name"
                placeholderTextColor="#9CA3AF"
              />
              <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center">
                <MaterialCommunityIcons name="pencil" size={16} color="#EAB308" />
              </View>
            </View>

            {/* Form Fields */}
            <View className="bg-white rounded-2xl p-4 gap-6 mb-6">

              {/* Time of Day with Popup Menu */}
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-medium text-gray-900">Time of day</Text>

                <Menu onSelect={(value) => setSection(value)}>
                  <MenuTrigger>
                    <View className="flex-row items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <Ionicons name={activeSectionIcon as any} size={16} color="black" />
                      <Text className="text-sm font-medium">{activeSectionLabel}</Text>
                      <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{
                    optionsContainer: {
                      borderRadius: 14,
                      padding: 4,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 12,
                      elevation: 5,
                      minWidth: 180,
                    }
                  }}>
                    {SECTIONS.map((s) => (
                      <MenuOption key={s.id} value={s.id}>
                        <View className="flex-row items-center gap-3 px-3 py-3">
                          <Ionicons name={s.icon as any} size={18} color="gray" />
                          <Text className="text-sm font-medium text-gray-800 flex-1">{s.label}</Text>
                          {section === s.id && (
                            <Ionicons name="checkmark" size={16} color="black" />
                          )}
                        </View>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>

              {/* Conditional fields based on section */}
              {section === 'at_time' ? (
                <>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-medium text-gray-900">Date</Text>
                    <TouchableOpacity
                      onPress={() => openPicker('date', 'date')}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2"
                    >
                      <Ionicons name="calendar-outline" size={16} color="black" />
                      <Text className="text-sm font-medium">{format(date, 'MMM dd, yyyy')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-medium text-gray-900">Starts</Text>
                    <TouchableOpacity
                      onPress={() => openPicker('time', 'start')}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg"
                    >
                      <Text className="text-sm font-medium">{format(startTime, 'h:mm a')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-medium text-gray-900">Ends</Text>
                    <TouchableOpacity
                      onPress={() => openPicker('time', 'end')}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg"
                    >
                      <Text className="text-sm font-medium">{format(endTime, 'h:mm a')}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-medium text-gray-900">Date</Text>
                    <TouchableOpacity
                      onPress={() => openPicker('date', 'date')}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2"
                    >
                      <Ionicons name="calendar-outline" size={16} color="black" />
                      <Text className="text-sm font-medium">{format(date, 'MMM dd, yyyy')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-medium text-gray-900">Duration</Text>
                    <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
                      <Ionicons name="time-outline" size={16} color="black" />
                      <Text className="text-sm font-medium">{duration}</Text>
                    </View>
                  </View>
                </>
              )}

              <View className="flex-row justify-between items-center">
                <Text className="text-base font-medium text-gray-900">Repeat</Text>
                <View className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
                  <Ionicons name="repeat" size={16} color="black" />
                  <Text className="text-sm font-medium">M, T, W, T, F every week</Text>
                </View>
              </View>
            </View>

            {/* Subtasks */}
            <View className="bg-white rounded-2xl p-4 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-base font-medium text-gray-900">Sub-tasks</Text>
                <View className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex-row items-center gap-2">
                  <Text className="text-[10px] font-bold text-gray-900">SUGGEST BREAKDOWN</Text>
                  <MaterialCommunityIcons name="magic-staff" size={14} color="#8B5CF6" />
                </View>
              </View>
              <View className="border border-dashed border-gray-200 p-3 rounded-xl items-center">
                <Text className="text-xs font-bold text-gray-400">ADD NEW +</Text>
              </View>
            </View>

            {/* Notes */}
            <View className="bg-white rounded-2xl p-4 h-32">
              <TextInput
                placeholder="Write your notes here..."
                placeholderTextColor="#9CA3AF"
                multiline
                style={{ fontSize: 16, color: '#1C1C1E', flex: 1 }}
              />
            </View>
          </ScrollView>

          {/* Footer */}
          <View
            style={{ paddingBottom: insets.bottom + 16 }}
            className="absolute bottom-0 left-4 right-4 flex-row justify-between items-center"
          >
            <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-6 py-3 rounded-full shadow-sm">
              <Text className="font-bold text-gray-900">Start task</Text>
            </TouchableOpacity>
          </View>

          {/* Date/Time Picker */}
          {pickerMode && (
            <DateTimePicker
              value={pickerTarget === 'date' ? date : pickerTarget === 'start' ? startTime : endTime}
              mode={pickerMode}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {/* Update Confirmation Modal */}
          <Modal visible={showUpdateMenu} transparent animationType="fade">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowUpdateMenu(false)}
              className="flex-1 bg-black/20 items-end pr-4 pt-20"
            >
              <View className="bg-white/90 rounded-2xl p-2 w-64 shadow-xl">
                <Text className="text-center py-3 text-sm font-medium border-b border-gray-200">
                  Update '{title}'
                </Text>
                {['Update this only', 'Update all future', 'Update all'].map((label, i) => (
                  <View key={label}>
                    {i > 0 && <View className="h-[1px] bg-gray-200" />}
                    <TouchableOpacity
                      onPress={handleFinalSave}
                      className="py-3 items-center active:bg-gray-100 rounded-lg"
                    >
                      <Text className="text-base text-gray-900">{label}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}