import React, { createContext, ReactNode, useContext, useState } from 'react';

// --- Types shared between screens ---
export type SectionType = 'HIGH' | 'MEDIUM' | 'LOW' | 'TODO' | 'DONE';

export interface BaseItem {
  id: string;
  type: 'HEADER' | 'TASK';
}

export interface HeaderItem extends BaseItem {
  type: 'HEADER';
  section: SectionType;
  label: string;
  count: number;
}

export interface TaskItem extends BaseItem {
  type: 'TASK';
  title: string;
  icon: string;
  completed: boolean;
  priority: SectionType;
}

export type ListItem = HeaderItem | TaskItem;

interface TodoContextType {
  data: ListItem[];
  addTask: (title: string, priority: SectionType) => void;
  moveTaskFromTodayToTodo: (taskTitle: string, icon: string) => void;
  toggleTask: (taskId: string) => void;
  updateData: (newData: ListItem[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const INITIAL_DATA: ListItem[] = [
  { id: 'h-high', type: 'HEADER', section: 'HIGH', label: 'HIGH', count: 1 },
  { id: 't1', type: 'TASK', title: 'Do homework', priority: 'HIGH', icon: '📚', completed: false },
  
  { id: 'h-med', type: 'HEADER', section: 'MEDIUM', label: 'MEDIUM', count: 1 },
  { id: 't2', type: 'TASK', title: 'Weekly meal preparation', priority: 'MEDIUM', icon: '🥘', completed: false },

  { id: 'h-low', type: 'HEADER', section: 'LOW', label: 'LOW', count: 1 },
  { id: 't3', type: 'TASK', title: 'Do laundry', priority: 'LOW', icon: '🧺', completed: false },

  { id: 'h-todo', type: 'HEADER', section: 'TODO', label: 'TO-DO', count: 1 },
  { id: 't4', type: 'TASK', title: 'Go to gym', priority: 'TODO', icon: '🏋️', completed: false },

  { id: 'h-done', type: 'HEADER', section: 'DONE', label: 'DONE', count: 1 },
  { id: 't5', type: 'TASK', title: 'Paying rent', priority: 'DONE', icon: '🏠', completed: true },
];

export function TodoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ListItem[]>(INITIAL_DATA);

  // Helper to add a task directly
  const addTask = (title: string, priority: SectionType) => {
    const newTask: TaskItem = {
      id: Math.random().toString(),
      type: 'TASK',
      title: title,
      priority: priority,
      icon: '✨',
      completed: false,
    };
    insertTask(newTask, priority);
  };

  // 1. NEW FUNCTION: Handle moving from Today Screen
  const moveTaskFromTodayToTodo = (taskTitle: string, iconName: string) => {
    // Map icons from Ionicons (Today) to Emojis (Todo) if desired, or just use a default
    const newTask: TaskItem = {
      id: `moved-${Date.now()}`,
      type: 'TASK',
      title: taskTitle,
      priority: 'TODO', // Defaulting to TO-DO section
      icon: '📌', // Using a pin emoji for moved items
      completed: false,
    };
    insertTask(newTask, 'TODO');
  };

  const insertTask = (newTask: TaskItem, section: SectionType) => {
    const newData = [...data];
    // Find the header for the target section
    const headerIndex = newData.findIndex(item => item.type === 'HEADER' && item.section === section);
    
    if (headerIndex !== -1) {
      // Insert after header
      newData.splice(headerIndex + 1, 0, newTask);
    } else {
      newData.push(newTask);
    }
    setData(newData);
  };

  const toggleTask = (taskId: string) => {
    const newData = [...data];
    const taskIndex = newData.findIndex(i => i.id === taskId);
    if (taskIndex === -1) return;

    const task = newData[taskIndex] as TaskItem;
    const isCompleting = !task.completed;

    // Remove from current position
    newData.splice(taskIndex, 1);

    const updatedTask: TaskItem = {
      ...task,
      completed: isCompleting,
      priority: isCompleting ? 'DONE' : 'TODO',
    };

    // Re-insert into correct section
    if (isCompleting) {
      const doneHeaderIndex = newData.findIndex(i => i.type === 'HEADER' && i.section === 'DONE');
      newData.splice(doneHeaderIndex + 1, 0, updatedTask);
    } else {
      const todoHeaderIndex = newData.findIndex(i => i.type === 'HEADER' && i.section === 'TODO');
      newData.splice(todoHeaderIndex + 1, 0, updatedTask);
    }

    setData(newData);
  };

  const updateData = (newData: ListItem[]) => {
    setData(newData);
  };

  return (
    <TodoContext.Provider value={{ data, addTask, moveTaskFromTodayToTodo, toggleTask, updateData }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within a TodoProvider');
  return context;
}