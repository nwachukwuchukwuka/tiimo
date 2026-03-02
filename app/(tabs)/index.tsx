import AddTaskModal from '@/components/AddTaskModal';
import AddTaskSheet from '@/components/AddTaskSheet';
import EditTaskModal from '@/components/EditTaskModal';
import TaskActionSheet from '@/components/TaskActionSheet';
import TaskList from '@/components/today/TaskList';
import TodayHeader from '@/components/today/TodayHeader';
import { DailyData, INITIAL_TASKS, Task } from '@/constants';
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
    setModalMode('edit');
    setTimeout(() => setAddTaskModalVisible(true), 200);
  };

  const handleMakeCopy = () => {
    actionSheetRef.current?.dismiss();
    if (selectedTask) {
      const copyTask = {
        ...selectedTask,
        title: `${selectedTask.title} (Copy)`,
        id: `copy-${Date.now()}`
      };
      setSelectedTask(copyTask);
      setModalMode('copy');
      setTimeout(() => setAddTaskModalVisible(true), 200);
    }
  };


  const handleSaveFromModal = (taskData: Task) => {
    if (modalMode === 'edit') {
      setDailyData((prev) => {
        const newState = { ...prev };


        let found = false;
        (Object.keys(newState) as Array<keyof DailyData>).forEach(key => {
          const idx = newState[key].findIndex(t => t.id === taskData.id);
          if (idx > -1) {
            newState[key].splice(idx, 1);
            found = true;
          }
        });

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
        // icon: '✨',
        icon: 'web',
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
      icon: 'web',
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
            onAddPress={() => addTaskSheetRef.current?.present()}

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
              mode={modalMode}
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