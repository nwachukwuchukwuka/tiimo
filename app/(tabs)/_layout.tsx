// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform, View } from "react-native";

// export default function TabsLayout() {
//     return (
//         <Tabs
//             screenOptions={{
//                 headerShown: false,
//                 tabBarStyle: {
//                     backgroundColor: '#fff',
//                     borderTopWidth: 0,
//                     height: Platform.OS === 'ios' ? 88 : 60,
//                     paddingTop: 10,
//                 },
//                 tabBarShowLabel: false,
//                 tabBarActiveTintColor: '#FFFFFF',
//                 tabBarInactiveTintColor: '#525252',
//             }}
//         >
//             <Tabs.Screen
//                 name="to-do"
//                 options={{
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "home" : "home-outline"}
//                             size={26}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "grid" : "grid-outline"}
//                             size={26}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             <Tabs.Screen
//                 name="focus"
//                 options={{
//                     tabBarIcon: () => (
//                         <View
//                             className="bg-white w-12 h-12 rounded-full items-center justify-center"
//                             style={{
//                                 shadowColor: "#fff",
//                                 shadowOffset: { width: 0, height: 0 },
//                                 shadowOpacity: 0.2,
//                                 shadowRadius: 5,
//                             }}
//                         >
//                             <Ionicons name="sparkles" size={22} color="black" />
//                         </View>
//                     ),
//                 }}
//             />

//             <Tabs.Screen
//                 name="me"
//                 options={{
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "cart" : "cart-outline"}
//                             size={28}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//         </Tabs>
//     );
// }


// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform } from "react-native";

// export default function TabsLayout() {
//     return (
//         <Tabs
//             screenOptions={{
//                 headerShown: false,
//                 tabBarStyle: {
//                     backgroundColor: '#fff',
//                     borderTopWidth: 0,
//                     height: Platform.OS === 'ios' ? 88 : 60,
//                     paddingTop: 10,
//                 },
//                 tabBarShowLabel: true, // Changed to true to show labels
//                 tabBarLabelStyle: {
//                     fontSize: 11,
//                     marginTop: 4,
//                 },
//                 tabBarActiveTintColor: '#000000',
//                 tabBarInactiveTintColor: '#A3A3A3',
//             }}
//         >
//             {/* To-do Tab */}
//             <Tabs.Screen
//                 name="to-do"
//                 options={{
//                     title: "To-do",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "checkbox" : "checkbox-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             {/* Today Tab (index) */}
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: "Today",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "calendar" : "calendar-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             {/* Focus Tab */}
//             <Tabs.Screen
//                 name="focus"
//                 options={{
//                     title: "Focus",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "moon" : "moon-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//             {/* Me Tab */}
//             <Tabs.Screen
//                 name="me"
//                 options={{
//                     title: "Me",
//                     tabBarIcon: ({ color, focused }) => (
//                         <Ionicons
//                             name={focused ? "happy" : "happy-outline"}
//                             size={24}
//                             color={color}
//                         />
//                     ),
//                 }}
//             />

//         </Tabs>
//     );
// }



import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        height: Platform.OS === 'ios' ? 88 : 60,
                        paddingTop: 10,
                    },
                    tabBarShowLabel: true,
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginTop: 4,
                    },
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#A3A3A3',
                }}
            >
                <Tabs.Screen
                    name="to-do"
                    options={{
                        title: "To-do",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "checkbox" : "checkbox-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Today",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "calendar" : "calendar-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="focus"
                    options={{
                        title: "Focus",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "moon" : "moon-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="me"
                    options={{
                        title: "Me",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "happy" : "happy-outline"}
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>

            <Link href="/ai-chat" asChild>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: Platform.OS === 'ios' ? 100 : 80,
                        right: 20,
                        zIndex: 50, 
                     
                    }}
                >
                    <LinearGradient
                        colors={['#A89AFF', '#C4B5FD']}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: '#FFFFFF',
                            transform: [{ rotate: '-10deg' }]
                        }}
                    >
                        <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                            <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 4 }} />
                            <View style={{ width: 8, height: 8, backgroundColor: 'black', borderRadius: 4 }} />
                        </View>
                        <View style={{ width: 8, height: 4, backgroundColor: 'black', borderRadius: 2, marginTop: 4 }} />
                    </LinearGradient>
                </TouchableOpacity>
            </Link>
        </View>
    );
}