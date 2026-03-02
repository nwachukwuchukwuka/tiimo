import { Slot, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuestionnaireLayout() {
    const router = useRouter();
    const pathname = usePathname();

    // Define total steps and map routes to progress
    // needs -> 33%, neurodivergent -> 66%, notifications -> 100%
    const getProgress = () => {
        if (pathname.includes('needs')) return '33%';
        if (pathname.includes('neurodivergent')) return '66%';
        if (pathname.includes('notifications')) return '100%';
        return '0%';
    };

    const progressWidth = getProgress();

    const handleSkip = () => {
        // Define skip logic: Skip usually jumps to the next logical main step
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <StatusBar style="dark" />

            <View className="flex-1 px-6 pt-2">
                {/* --- Shared Header with Progress Bar --- */}
                <View className="flex-row items-center justify-between mb-6">
                    <View className="h-1.5 flex-1 bg-[#E0D9FF] rounded-full overflow-hidden mr-4">
                        <View
                            style={{ width: progressWidth }}
                            className="h-full bg-[#8B7EFF] rounded-full"
                        />
                    </View>
                    <TouchableOpacity onPress={handleSkip}>
                        <Text className="text-xs font-bold text-gray-400 tracking-widest">SKIP</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Screen Content Renders Here --- */}
                <Slot />

            </View>
        </SafeAreaView>
    );
}