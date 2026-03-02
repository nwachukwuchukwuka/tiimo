import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

type Action = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress: () => void;
};

type Props = {
  onMakeCopy: () => void;
  onMoveToTodo: () => void;
  onEdit: () => void;
  onDelete?: () => void;
};

const TaskActionSheet = forwardRef<BottomSheetModal, Props>(({ onMakeCopy, onMoveToTodo, onEdit, onDelete }, ref) => {
  const snapPoints = useMemo(() => ['55%'], []);
  const router = useRouter();

  const handleAction = (actionFn: () => void) => {
    actionFn();
    (ref as any).current?.dismiss();
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete();
            (ref as any).current?.dismiss();
          },
        },
      ]
    );
  };

  const actions: Action[] = [
    { id: 'copy', label: 'Make a copy', icon: 'copy-outline', onPress: () => handleAction(onMakeCopy) },
    { id: 'move', label: 'Move to To-do', icon: 'folder-outline', onPress: () => handleAction(onMoveToTodo) },
    { id: 'reschedule', label: 'Reschedule', icon: 'calendar-outline', onPress: () => handleAction(() => { }) },
    { id: 'tomorrow', label: 'Reschedule for Tomorrow', icon: 'arrow-forward-outline', onPress: () => handleAction(() => { }) },
    { id: 'start', label: 'Start task', icon: 'play-circle-outline', onPress: () => handleAction(() => router.push('/focus')) },
    { id: 'edit', label: 'Edit task', icon: 'create-outline', onPress: () => handleAction(onEdit) },
    { id: 'delete', label: 'Delete task', icon: 'trash-outline', color: '#EF4444', onPress: handleDeletePress },
  ];

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
    >
      <BottomSheetView className="flex-1 px-4 pb-8">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={action.onPress}
            className="flex-row items-center gap-4 py-4 active:bg-gray-200/50 rounded-xl px-2"
          >
            <Ionicons name={action.icon} size={24} color={action.color || '#1C1C1E'} />
            <Text style={{ color: action.color || '#1C1C1E' }} className="text-base font-medium">
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default TaskActionSheet;