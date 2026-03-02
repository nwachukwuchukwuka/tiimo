import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SLIDER_WIDTH = width - 48;
const KNOB_SIZE = 52;
const MAX_SLIDE = SLIDER_WIDTH - KNOB_SIZE - 8;

const COLORS = ['#C4B5FD', '#A78BFA', '#8B5CF6', '#DDD6FE', '#7C3AED', '#EDE9FE'];

const ITEMS = [
    { emoji: '🌯', color: '#C4B5FD' },
    { emoji: '📚', color: '#A78BFA' },
    { emoji: '💧', color: '#8B5CF6' },
    { emoji: '🌙', color: '#DDD6FE' },
    { emoji: '💻', color: '#7C3AED' },
    { emoji: '🥗', color: '#EDE9FE' },
    { emoji: '🌅', color: '#C4B5FD' },
    { emoji: '⭐', color: '#A78BFA' },
    { emoji: '🎯', color: '#8B5CF6' },
    { emoji: '🔥', color: '#DDD6FE' },
    { emoji: '💡', color: '#7C3AED' },
    { emoji: '🏆', color: '#EDE9FE' },
    { emoji: '🌯', color: '#C4B5FD' },
    { emoji: '📚', color: '#A78BFA' },
    { emoji: '💧', color: '#8B5CF6' },
    { emoji: '🌙', color: '#DDD6FE' },
    { emoji: '💻', color: '#7C3AED' },
    { emoji: '🥗', color: '#EDE9FE' },
    { emoji: '🌅', color: '#C4B5FD' },
    { emoji: '⭐', color: '#A78BFA' },
];

const FallingItem = ({
    emoji,
    color,
    delay,
    xPos,
    size = 64,
}: {
    emoji: string;
    color: string;
    delay: number;
    xPos: number;
    size?: number;
}) => {
    const translateY = useSharedValue(-size - 20);
    const rotate = useSharedValue(Math.random() * 30 - 15);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        translateY.value = withDelay(
            delay,
            withTiming(height + size, {
                duration: 2800 + Math.random() * 1200,
            })
        );
        rotate.value = withDelay(
            delay,
            withTiming(rotate.value + (Math.random() > 0.5 ? 60 : -60), {
                duration: 3000,
            })
        );
        scale.value = withDelay(delay, withSpring(1, { damping: 10 }));
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
            { scale: scale.value },
        ],
        left: xPos,
        position: 'absolute',
        top: 0,
    }));

    return (
        <Animated.View style={style}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontSize: size * 0.45 }}>{emoji}</Text>
            </View>
        </Animated.View>
    );
};

const CelebrationView = () => {
    return (
        <View className="flex-1 bg-white items-center justify-center relative overflow-hidden">
            <Text className="text-3xl font-bold text-[#1C1C1E] z-10">You've got this! 🎉</Text>

            {ITEMS.map((item, index) => {
                const columns = 5;
                const col = index % columns;
                const colWidth = width / columns;
                const xPos = col * colWidth + (colWidth - 64) / 2 + (Math.random() * 20 - 10);
                const delay = (index % 8) * 150 + Math.floor(index / 8) * 400;
                const size = 56 + Math.floor(Math.random() * 20);

                return (
                    <FallingItem
                        key={index}
                        emoji={item.emoji}
                        color={item.color}
                        delay={delay}
                        xPos={xPos}
                        size={size}
                    />
                );
            })}
        </View>
    );
};

export default function CommitScreen() {
    const router = useRouter();
    const [finished, setFinished] = useState(false);
    const translateX = useSharedValue(0);

    const handleFinish = () => {
        setFinished(true);
        setTimeout(() => {
            router.replace('/(tabs)');
        }, 4000);
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.max(0, Math.min(event.translationX, MAX_SLIDE));
        })
        .onEnd(() => {
            if (translateX.value > MAX_SLIDE * 0.85) {
                translateX.value = withSpring(MAX_SLIDE);
                runOnJS(handleFinish)();
            } else {
                translateX.value = withSpring(0);
            }
        });

    const knobStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const textOpacity = useAnimatedStyle(() => ({
        opacity: 1 - translateX.value / (MAX_SLIDE * 0.6),
    }));

    if (finished) {
        return <CelebrationView />;
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <View className="px-6 flex-1 justify-between">
                <View>
                    <Text className="text-3xl font-serif text-[#1C1C1E] mb-8 leading-tight">
                        Lastly, commit to get this done!
                    </Text>

                    <View className="gap-4">
                        <View className="flex-row items-center gap-3">
                            <Text>🌅</Text>
                            <Text className="text-gray-700 font-medium">Morning routine</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Text>💻</Text>
                            <Text className="text-gray-700 font-medium">Start work</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Text>🌯</Text>
                            <Text className="text-gray-700 font-medium">Lunch</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Text>💧</Text>
                            <Text className="text-gray-700 font-medium">Drink water</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Text>🌙</Text>
                            <Text className="text-gray-700 font-medium">Evening routine</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <Text>📚</Text>
                            <Text className="text-gray-700 font-medium">Working on school assignments</Text>
                        </View>
                    </View>
                </View>

                {/* Slider */}
                <View
                    className="bg-[#1C1C1E] rounded-full justify-center overflow-hidden"
                    style={{ height: KNOB_SIZE + 8, width: SLIDER_WIDTH, padding: 4 }}
                >
                    <Animated.Text style={[textOpacity, {
                        position: 'absolute',
                        alignSelf: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        letterSpacing: 0.3,
                    }]}>
                        Slide to confirm
                    </Animated.Text>

                    <GestureDetector gesture={gesture}>
                        <Animated.View
                            style={[knobStyle, {
                                width: KNOB_SIZE,
                                height: KNOB_SIZE,
                                borderRadius: KNOB_SIZE / 2,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }]}
                        >
                            <Ionicons name="chevron-forward" size={20} color="black" />
                        </Animated.View>
                    </GestureDetector>
                </View>
            </View>
        </SafeAreaView>
    );
}