// import { Button } from '@/components/ui/Button';
// import { useAuth } from '@/context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useEffect } from 'react';
// import { Dimensions, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// export default function LandingScreen() {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (isAuthenticated) {
//         router.replace('/(tabs)');
//       } else {
//         router.replace('/(auth)');
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [isAuthenticated, router]);

//   return (
//     <View className="flex-1 bg-white">
//       {/* Background Gradient & Image Area */}
//       <View className="flex-1 relative justify-center items-center overflow-hidden">
//         <LinearGradient
//           colors={['#E0D9FF', '#FFFFFF']} // Approximate purple fade
//           style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
//         />

//         {/* Abstract Background Decoration (Optional: Represented as circles here) */}
//         <View className="absolute top-10 left-[-50] w-64 h-64 bg-purple-300 rounded-full opacity-30 blur-3xl" />

//         {/* Mock Phone Image Placeholder */}
//         <View
//           className="bg-black/80 rounded-[40px] border-4 border-gray-800 shadow-2xl"
//           style={{ width: width * 0.6, height: width * 1.1 }}
//         >
//           {/* You would put the actual mock image here */}
//           <View className="w-full h-full bg-white rounded-[36px] items-center justify-center">
//             <Text className="text-gray-400">App Preview</Text>
//           </View>
//         </View>
//       </View>

//       {/* Bottom Content */}
//       <SafeAreaView edges={['bottom']} className="px-6 pb-6 bg-transparent">
//         <View className="gap-8">
//           <View>
//             {/* Using serif font to match design */}
//             <Text className="text-4xl font-serif text-center text-[#1C1C1E] leading-tight">
//               All-in-one planning and productivity
//             </Text>
//           </View>

//           <View className="gap-3">
//             <Button
//               title="Sign in with Apple"
//               variant="apple"
//               icon="logo-apple"
//               onPress={() => { }}
//             />
//             <Button
//               title="Continue with email"
//               onPress={() => router.push('/sign-up')}
//             />
//           </View>

//           <Text className="text-center text-gray-500 font-medium">
//             Already have an account? <Text className="underline text-[#1C1C1E]">Log in here</Text>
//           </Text>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }



// import React from 'react';
// import { View, Text, StatusBar } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// // import { COLORS } from '../constants/theme';
// import { TiimoLogoIcon, LaurelWreath } from '../components/Graphics';
// import { COLORS } from '@/constants';

// export default function SplashScreen() {
//   return (
//     <View className="flex-1">
//       <StatusBar barStyle="dark-content" />

//       {/* Background Gradient */}
//       <LinearGradient
//         colors={[COLORS.gradientTop, COLORS.gradientBottom]}
//         locations={[0.4, 1.0]} // White stays until 40%, then fades to purple
//         className="absolute left-0 right-0 top-0 bottom-0"
//       />

//       <SafeAreaView
//         edges={['top', 'bottom']}
//         className="flex-1 justify-between items-center py-10"
//       >
//         {/* Top Spacer to balance layout (Pushing content to visual center) */}
//         <View className="flex-1" />

//         {/* Center Content: Logo & Brand Name */}
//         <View className="items-center gap-6 flex-[2] justify-center">
//           <TiimoLogoIcon size={110} />
//           <Text
//             className="text-5xl font-black tracking-widest text-black"
//             style={{ fontFamily: 'System' }} // Ensures standard san-serif bold
//           >
//             tiimo
//           </Text>
//         </View>

//         {/* Bottom Footer: Apple Design Award */}
//         <View className="flex-row items-center justify-center gap-2 mb-4">

//           {/* Left Wreath */}
//           <LaurelWreath size={50} flipped={false} />

//           {/* Center Award Info */}
//           <View className="items-center gap-1">
//             <Ionicons name="logo-apple" size={28} color="black" />
//             <View className="items-center">
//               <Text className="text-xs font-bold text-black uppercase tracking-wide">
//                 Apple Design Award
//               </Text>
//               <Text className="text-xs font-medium text-black">
//                 2024 Finalist
//               </Text>
//             </View>
//           </View>

//           {/* Right Wreath (Flipped) */}
//           <LaurelWreath size={50} flipped={true} />

//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }



import { LaurelWreath, TiimoLogoIcon } from '@/components/Graphics';
import { COLORS } from '@/constants';
import { useAuth } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={[COLORS.splashGradientTop, COLORS.splashGradientBottom]}
        locations={[0.4, 1.0]}
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      <SafeAreaView
        edges={['top', 'bottom']}
        className="flex-1 justify-between items-center py-10"
      >
        <View className="flex-1" />

        <View className="items-center gap-6 flex-[2] justify-center">
          <TiimoLogoIcon size={110} />
          <Text
            className="text-5xl font-black tracking-widest"
            style={{
              fontFamily: 'System',
              color: COLORS.primary
            }}
          >
            tiimo
          </Text>
        </View>

        <View className="flex-row items-center justify-center gap-2 mb-4">

          <LaurelWreath size={50} flipped={false} />

          <View className="items-center gap-1">
            <Ionicons name="logo-apple" size={28} color={COLORS.primary} />
            <View className="items-center">
              <Text
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: COLORS.primary }}
              >
                Apple Design Award
              </Text>
              <Text
                className="text-xs font-medium"
                style={{ color: COLORS.primary }}
              >
                2024 Finalist
              </Text>
            </View>
          </View>

          <LaurelWreath size={50} flipped={true} />

        </View>
      </SafeAreaView>
    </View>
  );
}