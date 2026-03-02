import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';

import { CompletionModal } from '@/components/CompletionModal';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.65;
const STROKE_WIDTH = 35;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TASKS = [
  { id: '1', title: 'Wake up', icon: '🌅', completed: true },
  { id: '2', title: 'Brush teeth', icon: '🪥', completed: false },
  { id: '3', title: 'Breakfast', icon: '🍳', completed: false },
  { id: '4', title: 'Have coffee', icon: '☕', completed: false },
];

const BUTTON_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HeaderButton = ({ icon, label }: { icon: keyof typeof Ionicons.glyphMap, label: string }) => (
  <TouchableOpacity
    style={BUTTON_SHADOW}
    className="bg-white flex-row items-center gap-2 px-4 py-3 rounded-full"
  >
    <Ionicons name={icon} size={16} color="black" />
    <Text className="text-sm font-semibold text-[#1C1C1E]">{label}</Text>
  </TouchableOpacity>
);

const TaskItem = ({ item, active }: { item: typeof TASKS[0], active?: boolean }) => (
  <View className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 ${active ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
    <View className="flex-row items-center gap-3">
      <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
        <Text>{item.icon}</Text>
      </View>
      <Text className={`font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-[#1C1C1E]'}`}>
        {item.title}
      </Text>
    </View>
    <View className={`w-6 h-6 rounded-full border items-center justify-center ${item.completed ? 'bg-black border-black' : 'border-gray-300'}`}>
      {item.completed && <Ionicons name="checkmark" size={14} color="white" />}
    </View>
  </View>
);

const Focus = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const theta = useSharedValue(2 * Math.PI * (15 / 60));

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  const getEndTime = () => {
    const secondsToAdd = isActive ? timeLeft : selectedMinutes * 60;
    const endDate = new Date(Date.now() + secondsToAdd * 1000);
    return endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            setShowCompletionModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  useEffect(() => {
    if (isActive) {
      const totalSeconds = selectedMinutes * 60;
      const elapsed = totalSeconds - timeLeft;
      const percentage = elapsed / totalSeconds;
      theta.value = withTiming(2 * Math.PI * percentage, { duration: 1000, easing: Easing.linear });
    } else {
      theta.value = withTiming(2 * Math.PI * (selectedMinutes / 60), { duration: 300 });
    }
  }, [timeLeft, isActive, selectedMinutes]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isActive) return;

      const x = e.x - CIRCLE_SIZE / 2;
      const y = e.y - CIRCLE_SIZE / 2;

      let angle = Math.atan2(y, x);
      angle += Math.PI / 2;

      if (angle < 0) {
        angle += 2 * Math.PI;
      }

      theta.value = angle;
      const minutes = Math.round((angle / (2 * Math.PI)) * 60);
      const clampedMinutes = Math.max(1, Math.min(60, minutes));

      runOnJS(setSelectedMinutes)(clampedMinutes);
    });

  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = CIRCUMFERENCE - (theta.value / (2 * Math.PI)) * CIRCUMFERENCE;
    return { strokeDashoffset };
  });

  const handleStart = () => {
    if (!isActive) {
      setTimeLeft(selectedMinutes * 60);
      theta.value = 0;
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  const handleModalClose = () => {
    setShowCompletionModal(false);
    setTimeLeft(selectedMinutes * 60);
    theta.value = 2 * Math.PI * (selectedMinutes / 60);
  };

  const handleAddMinute = () => {
    setTimeLeft((prev) => prev + 60);
    setSelectedMinutes((prev) => prev + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <View className="flex-row justify-between px-6 py-4">
          <HeaderButton icon="musical-note" label="Tune in" />
          <HeaderButton icon="timer-outline" label="Start focus" />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} scrollEnabled={!isActive} showsVerticalScrollIndicator={false}>

          <View className="items-center mt-6 mb-10">
            <Text className="text-3xl font-serif text-[#1C1C1E] mb-2">
              {isActive ? "Morning routine" : "Focus"}
            </Text>

            <Text className="text-xs font-medium text-gray-500 mb-8 tracking-widest uppercase">
              {getCurrentTime()} → {getEndTime()}
            </Text>

            <View className="items-center justify-center mb-6 relative">
              <GestureDetector gesture={gesture}>
                <View style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
                  <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                    <G rotation="-90" origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}>
                      <Circle
                        cx={CIRCLE_SIZE / 2}
                        cy={CIRCLE_SIZE / 2}
                        r={RADIUS}
                        stroke="#F3F0FF"
                        strokeWidth={STROKE_WIDTH}
                        fill="transparent"
                      />
                      <AnimatedCircle
                        cx={CIRCLE_SIZE / 2}
                        cy={CIRCLE_SIZE / 2}
                        r={RADIUS}
                        stroke="#8B7EFF"
                        strokeWidth={STROKE_WIDTH}
                        fill="transparent"
                        strokeDasharray={CIRCUMFERENCE}
                        animatedProps={animatedCircleProps}
                        strokeLinecap="round"
                      />
                    </G>
                  </Svg>

                  <View
                    className="absolute bg-white rounded-full items-center justify-center shadow-sm elevation-5"
                    style={{
                      width: CIRCLE_SIZE - STROKE_WIDTH * 2 - 20,
                      height: CIRCLE_SIZE - STROKE_WIDTH * 2 - 20,
                      top: STROKE_WIDTH + 10,
                      left: STROKE_WIDTH + 10,
                    }}
                  >
                    {isActive ? (
                      <Image
                        source={{ uri: 'https://em-content.zobj.net/source/apple/391/hourglass-done_231b.png' }}
                        className="w-16 h-16"
                        resizeMode="contain"
                      />
                    ) : (
                      <View className="items-center">
                        <Text className="text-6xl font-serif text-[#1C1C1E]">{selectedMinutes}</Text>
                        <Text className="text-xs font-bold text-gray-400 tracking-widest mt-1">MINS</Text>
                      </View>
                    )}
                  </View>
                </View>
              </GestureDetector>
            </View>

            <Text className="text-5xl font-variant-numeric text-[#1C1C1E] font-light mb-6">
              {isActive ? formatCountdown(timeLeft) : ""}
            </Text>

            <View className="flex-row items-center gap-4">
              {isActive && !isPaused ?
                <TouchableOpacity onPress={handleAddMinute}>
                  <Text className="font-bold text-[#1C1C1E]">+ 1 min</Text>
                </TouchableOpacity>
                :
                <Text className='font-semibold text-[#1C1C1E]'>Paused</Text>}

              <TouchableOpacity
                onPress={handleStart}
                className="bg-[#1C1C1E] px-8 py-4 rounded-full flex-row items-center gap-2"
              >
                {!isActive &&
                  <Text className="text-white font-bold text-lg">
                    Start
                  </Text>
                }
                {isActive && (
                  <Ionicons name={isPaused ? "play" : "pause"} size={18} color="white" />
                )}
                {!isActive && <Ionicons name="play" size={18} color="white" />}
              </TouchableOpacity>

          
            </View>
          </View>

          <View className="px-6">
            {!isActive && (
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                  <Ionicons name="moon" size={12} color="#6B21A8" />
                  <Text className="text-xs font-bold text-purple-800 uppercase">Evening (2)</Text>
                </View>
                <Ionicons name="add" size={24} color="#ccc" />
              </View>
            )}

            <View className="gap-1">
              {TASKS.map((task) => (
                <TaskItem key={task.id} item={task} active={!task.completed} />
              ))}
            </View>
          </View>

        </ScrollView>

        <CompletionModal
          visible={showCompletionModal}
          onClose={handleModalClose}
          taskCount={6}
        />

        <View className="absolute bottom-6 right-6">
          <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center border border-white shadow-sm">
            <View className="w-8 h-8 bg-[#A89AFF] rounded-full items-center justify-center overflow-hidden">
              <Text>👀</Text>
            </View>
          </View>
        </View>

      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Focus;