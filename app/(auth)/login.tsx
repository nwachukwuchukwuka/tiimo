import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('alexsmith.mobbin+1@gmail.com'); // Mock default
  const [password, setPassword] = useState('');
  
  // --- Bottom Sheet State ---
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [sheetView, setSheetView] = useState<'input' | 'success'>('input');
  
  const snapPoints = useMemo(() => ['20%'], []);

  const isFormValid = email.length > 0 && password.length > 0;

  // --- Handlers ---

  const handleOpenReset = () => {
    setSheetView('input');
    bottomSheetRef.current?.present();
  };

  const handleSubmitReset = () => {
    // Switch to success view
    setSheetView('success');
    // Optional: Close keyboard
    Keyboard.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
      />
    ),
    []
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <StatusBar style="dark" />

        {/* --- MAIN LOGIN UI --- */}
        <LinearGradient
          colors={['#FFFFFF', '#FFF5F5', '#E0D4FC']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          {/* Decorative Circle */}
          <View className="absolute top-0 right-0 w-32 h-32 bg-[#8B7FF5] rounded-bl-[100px] z-0" />

          <SafeAreaView className="flex-1 px-6 pt-10">
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1"
            >
              <View className="mt-10 mb-8">
                <Text className="text-4xl font-serif text-black mb-2">Sign in to Tiimo</Text>
                <Text className="text-neutral-600 text-base">Ready to start where you left off?</Text>
              </View>

              <TouchableOpacity className="bg-black flex-row items-center justify-center py-4 rounded-full mb-6 shadow-sm">
                <Ionicons name="logo-apple" size={20} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-bold text-base">Continue with Apple</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-between mb-6">
                <View className="h-[1px] bg-neutral-300 flex-1" />
                <Text className="text-neutral-400 text-xs mx-4 uppercase">Sign in with Apple or Email</Text>
                <View className="h-[1px] bg-neutral-300 flex-1" />
              </View>

              <View className="gap-5">
                <View>
                  <Text className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-wider">
                    <Ionicons name="mail-outline" size={12} /> Email
                  </Text>
                  <TextInput 
                    placeholder="e.g. hello@tiimo.com"
                    placeholderTextColor="#A3A3A3"
                    className="bg-white/60 px-4 py-4 rounded-2xl text-base font-medium"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View>
                  <Text className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-wider">
                    <Ionicons name="key-outline" size={12} /> Password
                  </Text>
                  <TextInput 
                    placeholder="Strong password"
                    placeholderTextColor="#A3A3A3"
                    className="bg-white/60 px-4 py-4 rounded-2xl text-base font-medium"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <View className="mt-8">
                <TouchableOpacity 
                  disabled={!isFormValid}
                  className={`py-4 rounded-full items-center justify-center ${isFormValid ? 'bg-black shadow-md' : 'bg-[#D6D3CF]'}`}
                >
                  <Text className={`font-bold text-lg ${isFormValid ? 'text-white' : 'text-[#8E8B87]'}`}>Login</Text>
                </TouchableOpacity>
              </View>

              <View className="items-center mt-6 gap-3">
                {/* TRIGGER RESET MODAL */}
                <TouchableOpacity onPress={handleOpenReset}>
                  <Text className="text-black font-bold underline">Reset password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/sign-up')}>
                  <Text className="text-black font-bold underline">Create new account</Text>
                </TouchableOpacity>
              </View>

            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>

        {/* --- RESET PASSWORD BOTTOM SHEET --- */}
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0} // Opens at 50% height
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: '#F2F4F7', borderRadius: 32 }} // Light gray bg like screenshot
          handleIndicatorStyle={{ backgroundColor: '#D4D4D4' }}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          enableDynamicSizing={false}
        >
          <BottomSheetView className="flex-1 px-6 pt-4 pb-10">
            
            {sheetView === 'input' ? (
              // 1. INPUT STATE
              <View>
                <Text className="text-2xl font-bold text-black mb-6">Reset password</Text>
                
                {/* Input Container */}
                <View className="flex-row items-center justify-between">
                  {/* Using BottomSheetTextInput for proper keyboard handling */}
                  <BottomSheetTextInput 
                    value={resetEmail}
                    onChangeText={setResetEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#A3A3A3"
                    className="flex-1 text-lg text-black font-medium mr-4"
                    autoFocus={true} // Focus immediately
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  
                  {/* Submit Arrow Button */}
                  <TouchableOpacity 
                    onPress={handleSubmitReset} 
                    className="bg-black w-10 h-10 rounded-full items-center justify-center"
                  >
                    <Ionicons name="arrow-up" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // 2. SUCCESS STATE
              <View>
                <Text className="text-2xl font-bold text-black mb-2">Success</Text>
                <Text className="text-neutral-700 text-base leading-6 font-medium">
                  A password reset email has been sent to your account
                </Text>
              </View>
            )}

          </BottomSheetView>
        </BottomSheetModal>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});