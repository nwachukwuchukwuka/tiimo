import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export const COLORS = {
    primary: "#1C1C1E", 
    secondary: "#F2F2F7",
    accent: "#A89AFF", 
    white: "#FFFFFF",
    border: "#E5E5EA",
    disabled: "rgba(28, 28, 30, 0.3)",

    splashGradientTop: "#FFFFFF",  
    splashGradientBottom: "#D4C9FF",
};

export const ONBOARDING_DATA = {
    needs: [
        { id: 1, label: "Organize My Day and Time" },
        { id: 2, label: "Remember My Tasks" },
        { id: 3, label: "Prioritize To-Do's" },
        { id: 4, label: "Build and Stick to Routines" },
        { id: 5, label: "Support Focus Work" },
    ],
    neurodivergent: [
        { id: 1, label: "I am neurodivergent" },
        { id: 2, label: "I think I am neurodivergent" },
        { id: 3, label: "I am not neurodivergent" },
        { id: 4, label: "I don't know" },
    ],
};



export const EMOJI_DATA = [
    { char: '☀️', keywords: 'sun sunny weather happy' },
    { char: '🌙', keywords: 'moon night sleep evening dark' },
    { char: '☁️', keywords: 'cloud weather sky' },
    { char: '🌧️', keywords: 'rain weather wet' },
    { char: '❄️', keywords: 'snow cold winter' },
    { char: '🥖', keywords: 'bread food bakery baguette' },
    { char: '🍳', keywords: 'egg breakfast cook food' },
    { char: '🥞', keywords: 'pancakes breakfast food' },
    { char: '☕', keywords: 'coffee drink morning cafe' },
    { char: '🥗', keywords: 'salad healthy food lunch' },
    { char: '🧘', keywords: 'yoga meditate calm exercise' },
    { char: '🏃', keywords: 'run running exercise sport' },
    { char: '🏋️', keywords: 'gym weights exercise workout' },
    { char: '🚲', keywords: 'bike cycle ride transport' },
    { char: '💻', keywords: 'laptop work computer tech' },
    { char: '📱', keywords: 'phone mobile tech' },
    { char: '📚', keywords: 'book read study learn school' },
    { char: '📝', keywords: 'write note pencil paper' },
    { char: '🧹', keywords: 'broom clean chore' },
    { char: '🧺', keywords: 'laundry basket clothes chore' },
    { char: '🛏️', keywords: 'bed sleep room furniture' },
    { char: '🚿', keywords: 'shower bath clean water' },
    { char: '💧', keywords: 'water drop drink hydrate' },
    { char: '🎉', keywords: 'party celebrate fun confetti' },
    { char: '😃', keywords: 'smile happy face' },
    { char: '❤️', keywords: 'heart love like' },
    { char: '🐶', keywords: 'dog pet animal puppy' },
    { char: '🐱', keywords: 'cat pet animal kitten' },
    { char: '🚗', keywords: 'car drive transport' },
    { char: '🚌', keywords: 'bus transport travel' },
    { char: '✈️', keywords: 'plane travel fly' },
    { char: '🏠', keywords: 'house home building' },
    { char: '🎓', keywords: 'graduation cap school learn' },
    { char: '💼', keywords: 'briefcase work job business' },
    { char: '💰', keywords: 'money bag dollar cash' },
    { char: '⏰', keywords: 'clock time alarm watch' },
];



export type TagItem = {
    id: string;
    label: string;
    icon: string;
    bg: string;
    color: string;
};

export const DEFAULT_TAGS: TagItem[] = [
    { id: '1', label: 'Household', icon: 'basket', bg: '#fef3c7', color: '#92400e' }, // amber
    { id: '2', label: 'Human needs', icon: 'water', bg: '#dbeafe', color: '#1e40af' }, // blue
    { id: '3', label: 'Commute', icon: 'car', bg: '#dcfce7', color: '#166534' }, // green
    { id: '4', label: 'Exercise', icon: 'run', bg: '#f3e8ff', color: '#6b21a8' }, // purple
    { id: '5', label: 'Health', icon: 'brain', bg: '#ffe4e6', color: '#be123c' }, // rose
    { id: '6', label: 'Hobby', icon: 'palette', bg: '#ccfbf1', color: '#0f766e' }, // teal
    { id: '7', label: 'Pets', icon: 'paw', bg: '#ffedd5', color: '#c2410c' }, // orange
    { id: '8', label: 'Preparation', icon: 'bell', bg: '#fef9c3', color: '#a16207' }, // yellow
    { id: '9', label: 'Relationships', icon: 'heart', bg: '#fce7f3', color: '#db2777' }, // pink
    { id: '10', label: 'Self care', icon: 'flower', bg: '#fff7ed', color: '#c2410c' }, // orange-light
    { id: '11', label: 'Work', icon: 'laptop', bg: '#e5e7eb', color: '#374151' }, // gray
    { id: '12', label: 'Social', icon: 'human-greeting', bg: '#fce7f3', color: '#be185d' }, 
    { id: '13', label: 'Study', icon: 'school', bg: '#e0e7ff', color: '#3730a3' }, 
    { id: '14', label: 'Admin', icon: 'folder', bg: '#fffbeb', color: '#b45309' }, 
];



export type SubTask = {
    id: string;
    title: string;
    isCompleted: boolean;
    icon?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  };
  
  export type Task = {
    id: string;
    title: string;
    duration: string;
    icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap | string;
    iconBg: string;
    iconColor: string;
    isCompleted: boolean;
    originalSection: keyof DailyData;
    subTasks?: SubTask[];
  };

export type DailyData = {
    anytime: Task[];
    morning: Task[];
    afternoon: Task[];
    evening: Task[];
    done: Task[];
  };



export const INITIAL_TASKS: DailyData = {
    anytime: [],
    morning: [
      {
        id: '1',
        title: 'Plan your day',
        duration: '10m',
        icon: 'clipboard-text-outline',
        iconBg: 'bg-yellow-100',
        iconColor: '#EAB308',
        isCompleted: false,
        originalSection: 'morning'
      },
      {
        id: '2',
        title: 'Morning routine',
        duration: '30m',
        icon: 'weather-sunset',
        iconBg: 'bg-orange-100',
        iconColor: '#F97316',
        isCompleted: false,
        originalSection: 'morning',
        subTasks: [
          { id: 's1', title: 'Wake up', isCompleted: false, icon: 'weather-sunset' },
          { id: 's2', title: 'Brush teeth', isCompleted: false, icon: 'toothbrush' },
          { id: 's3', title: 'Breakfast', isCompleted: false, icon: 'food-croissant' },
          { id: 's4', title: 'Have coffee', isCompleted: false, icon: 'coffee' },
        ]
      },
    ],
    afternoon: [
      { id: '3', title: 'Quick tidy', duration: '5m', icon: 'broom', iconBg: 'bg-blue-100', iconColor: '#6366F1', isCompleted: false, originalSection: 'afternoon' },
      { id: '4', title: 'Drink water', duration: '5m', icon: 'water-outline', iconBg: 'bg-cyan-100', iconColor: '#06B6D4', isCompleted: false, originalSection: 'afternoon' },
      { id: '5', title: 'Start work', duration: '5m', icon: 'laptop', iconBg: 'bg-gray-200', iconColor: '#4B5563', isCompleted: false, originalSection: 'afternoon' },
      { id: '6', title: 'Lunch', duration: '20m', icon: 'food-outline', iconBg: 'bg-purple-100', iconColor: '#8B5CF6', isCompleted: false, originalSection: 'afternoon' },
    ],
    evening: [
      { id: '7', title: 'Have dinner', duration: '20m', icon: 'food-turkey', iconBg: 'bg-green-100', iconColor: '#22C55E', isCompleted: false, originalSection: 'evening' },
      { id: '8', title: 'Evening routine', duration: '10m', icon: 'moon-waning-crescent', iconBg: 'bg-yellow-50', iconColor: '#F59E0B', isCompleted: false, originalSection: 'evening' },
    ],
    done: []
  };