import { Stack } from "expo-router";

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen name="quiz" /> */}
            {/* <Stack.Screen name="updates-modal"  /> */}
            {/* <Stack.Screen
                name="updates-modal"
                options={{
                    presentation: 'modal',
                }}
            /> */}
        </Stack>
    );
}