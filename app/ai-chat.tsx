import ChatHistorySidebar from '@/components/ChatHistorySidebar';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView, Platform,
    ScrollView,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const AiCharacter = ({ size = 120 }: { size?: number }) => (
    <View className="items-center justify-center">
        <LinearGradient
            colors={['#A89AFF', '#C4B5FD']}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: "#A89AFF",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
            }}
        >
            {/* Face */}
            <View className="flex-row gap-4 mt-2">
                {/* Eyes (Sunglasses look) */}
                <View className="w-8 h-4 bg-black rounded-full rotate-[-10deg]" />
                <View className="w-8 h-4 bg-black rounded-full rotate-[10deg]" />
            </View>
            <View className="w-4 h-1 bg-black rounded-full mt-3" />
        </LinearGradient>

        {/* Hands (Simple Shapes) */}
        <View className="absolute -left-4 top-10 bg-white border border-gray-200 w-10 h-12 rounded-full rotate-[-45deg]" />
        <View className="absolute -right-4 top-16 bg-white border border-gray-200 w-12 h-8 rounded-full" />
    </View>
);

const SuggestionChip = ({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center bg-gray-100 px-4 py-3 rounded-full mr-2"
    >
        <Text className="mr-2">{icon}</Text>
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
    </TouchableOpacity>
);

type Message = { id: string; type: 'user' | 'ai'; text?: string; card?: any };

const MessageBubble = ({ msg }: { msg: Message }) => {
    if (msg.type === 'user') {
        return (
            <View className="self-end bg-[#F3E8FF] px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] mb-4">
                <Text className="text-gray-900 text-base">{msg.text}</Text>
            </View>
        );
    }

    return (
        <View className="self-start max-w-[90%] mb-6">
            {msg.text && (
                <View className="flex-row gap-3 mb-2">
                    <LinearGradient
                        colors={['#A89AFF', '#C4B5FD']}
                        style={{ width: 24, height: 24, borderRadius: 12 }}
                    />
                    <View className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex-1">
                        <Text className="text-gray-900 text-base leading-6">{msg.text}</Text>
                    </View>
                </View>
            )}

            {msg.card && (
                <View className="ml-9 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-64">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#9333EA" />
                        </View>
                        <View>
                            <Text className="font-bold text-gray-900 text-base">{msg.card.title}</Text>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="checkbox-outline" size={12} color="#6B7280" />
                                <Text className="text-gray-500 text-xs">{msg.card.subtitle}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default function AIChatScreen() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    const suggestions = [
        { id: 1, icon: '➡️', label: 'Move unfinished tasks' },
        { id: 2, icon: '🌞', label: 'Create a morning routine' },
        { id: 3, icon: '➕', label: 'Add a task' },
        { id: 4, icon: '⏰', label: 'What do I have time for?' },
    ];

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), type: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        Keyboard.dismiss();

        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                text: 'You have a new task to read books that will take about 30 minutes.',
                card: { title: 'Reading books', subtitle: 'To-do · 30m' }
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <View className="flex-1 bg-white">
            {isSidebarVisible && (
                <ChatHistorySidebar
                    visible={isSidebarVisible}
                    onClose={() => setSidebarVisible(false)}
                    onNewChat={() => {
                        setMessages([]);
                        setSidebarVisible(false);
                    }}
                />
            )}
            <SafeAreaView className="flex-1" edges={['top']}>

                {/* --- Header --- */}
                <View className="flex-row justify-between items-center px-4 py-2 z-10">
                    <TouchableOpacity
                        onPress={() => setSidebarVisible(true)}
                        className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
                    >
                        <Ionicons name="menu-outline" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
                    >
                        <Ionicons name="chevron-down" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* --- Main Content --- */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                >
                    {messages.length === 0 ? (
                        <View className="flex-1 justify-center items-center px-8">
                            <View className="mb-8">
                                <AiCharacter size={140} />
                            </View>
                            <Text
                                className="text-3xl font-bold text-center text-gray-900 mb-8"
                                style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
                            >
                                What's the plan today?
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <MessageBubble msg={item} />}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 20 }}
                            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            className="flex-1"
                        />
                    )}

                    {/* --- Bottom Input Area --- */}
                    <View className="bg-white">
                        <View className="h-14 mb-2">
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                className="flex-row"
                            >
                                {suggestions.map((s) => (
                                    <SuggestionChip
                                        key={s.id}
                                        icon={s.icon}
                                        label={s.label}
                                        onPress={() => setInputText(s.label)}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Input Bar */}
                        <View
                            className=" mb-2 p-1 pb-5 bg-white border-t border-gray-100 flex-row items-end"
                            style={{ elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 }}
                        >
                            <View className="flex-1 min-h-[60px] justify-center px-2">
                             
                                <TextInput
                                    className="text-lg text-gray-900 mb-10 pl-2"
                                    multiline
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholder="Ask anything"
                                    placeholderTextColor={"#808080"}
                                />

                                <View className="flex-row justify-between items-center px-4 pb-3">
                                    <TouchableOpacity className="flex-row items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                        <MaterialCommunityIcons name="web" size={14} color="#666" />
                                        <Text className="text-[10px] font-bold text-gray-600">ENGLISH</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Action Button */}
                            <TouchableOpacity
                                onPress={handleSend}
                                className={` p-2 px-4 items-center justify-center mb-1 mr-4 rounded-full ${inputText ? 'bg-black' : 'bg-black'}`}
                            >
                                {inputText ? (
                                    <Ionicons name="arrow-up" size={24} color="white" />
                                ) : (
                                    <View className="flex-row items-center gap-3">
                                        <FontAwesome5 name="microphone" size={16} color="white" />
                                        <Text className="text-white text-xs font-bold">Speak</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>


                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}