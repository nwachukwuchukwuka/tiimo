import { AuthProvider } from '@/context';
import { TodoProvider } from '@/context/TodoContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MenuProvider>
          <SafeAreaProvider>
            <TodoProvider>

              <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="onboarding" />
                  <Stack.Screen
                    name="ai-chat"
                    options={{
                      presentation: 'modal',

                    }}
                  />

                  <Stack.Screen name="home-screens/reschedule" options={{ presentation: 'fullScreenModal' }} />
                  <Stack.Screen name="home-screens/explore" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="home-screens/all-tasks" options={{ presentation: 'modal' }} />
                </Stack>
              </AuthProvider>
            </TodoProvider>


          </SafeAreaProvider>
        </MenuProvider>

      </BottomSheetModalProvider>

    </GestureHandlerRootView>
  );
}