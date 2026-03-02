import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types & Mock Data ---
interface Comment {
  id: string;
  user: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
  avatarColor: string;
}

const COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'Aimee Marie',
    initials: 'AM',
    time: '22w',
    text: "I have a worry, Stone I keep in my pocket. It's a rose quartz very smooth on one side either that or a fidget spinner.",
    likes: 9,
    avatarColor: 'bg-[#E0E7D9]' // Sage green
  },
  {
    id: '2',
    user: 'Kendra',
    initials: 'KE',
    time: '19w',
    text: "Breathing",
    likes: 7,
    avatarColor: 'bg-[#FFDBC9]' // Peach
  },
  {
    id: '3',
    user: 'Ellen',
    initials: 'EL',
    time: '19w',
    text: "I slow down and take a few breaths. I remind myself that it is all ok",
    likes: 7,
    avatarColor: 'bg-[#E0E7D9]'
  },
  {
    id: '4',
    user: 'Giselle',
    initials: 'GI',
    time: '20w',
    text: "Sharing with another person or family member",
    likes: 7,
    avatarColor: 'bg-[#FFDBC9]'
  },
  {
    id: '5',
    user: 'Stellasa',
    initials: 'ST',
    time: '18w',
    text: "Closing my eyes and telling me everything will be alright",
    likes: 6,
    avatarColor: 'bg-[#E0E7D9]'
  }
];

// --- Comment Component ---
const CommentItem = ({ comment }: { comment: Comment }) => (
  <View className="flex-row items-start mb-6">
      <View className={`w-10 h-10 rounded-full ${comment.avatarColor} items-center justify-center mr-3`}>
          <Text className="text-xs font-bold text-[#1C1C1E]">{comment.initials}</Text>
      </View>
      <View className="flex-1">
          <Text className="text-xs text-gray-500 mb-1">
             <Text className="font-medium text-[#1C1C1E]">{comment.user}</Text> · {comment.time}
          </Text>
          <Text className="text-base text-[#1C1C1E] leading-6 mb-2">
              {comment.text}
          </Text>
          <TouchableOpacity className="flex-row items-center gap-1">
              <Ionicons name="heart-outline" size={14} color="#1C1C1E" />
              <Text className="text-xs font-bold text-[#1C1C1E]">{comment.likes} Likes</Text>
          </TouchableOpacity>
      </View>
  </View>
);

export default function QuestionDetailScreen() {
  const router = useRouter();
  const [replyText, setReplyText] = useState('');
  const [hasReplied, setHasReplied] = useState(false);

  const handlePostReply = () => {
    if (replyText.trim().length === 0) return;
    setHasReplied(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <Stack.Screen options={{ headerShown: false }} />
        
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1"
        >
            {/* Header */}
            <View className="px-6 py-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                
                {/* Question Section */}
                <View className="px-6 items-center mb-8 mt-4">
                    <View className="bg-[#E0D9FF] px-3 py-1.5 rounded-full mb-6">
                        <Text className="text-xs font-serif text-[#1C1C1E]">Question of the day</Text>
                    </View>
                    
                    <Text className="text-4xl font-serif text-center text-[#1C1C1E] leading-tight">
                        What helps you stay present during busy moments?
                    </Text>
                </View>

                <View className="px-6 mb-8">
                    {!hasReplied ? (
                        /* --- STATE 1 & 2: INPUT --- */
                        <View className="bg-[#EFEFE8] rounded-2xl p-4 min-h-[120px] relative">
                            <TextInput 
                                placeholder="Write your answer here"
                                placeholderTextColor="#1C1C1E"
                                multiline
                                style={{ fontSize: 16, color: '#1C1C1E', fontWeight: '500' }}
                                value={replyText}
                                onChangeText={setReplyText}
                            />
                            
                            {/* Send Button (Only visible when typing) */}
                            {replyText.length > 0 && (
                                <View className="absolute bottom-4 right-4">
                                    <TouchableOpacity 
                                        onPress={handlePostReply}
                                        className="w-8 h-8 bg-[#1C1C1E] rounded-full items-center justify-center"
                                    >
                                        <Ionicons name="arrow-up" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ) : (
                        /* --- STATE 3: MY REPLY --- */
                        <View className="bg-[#EFEFE8] rounded-2xl p-5 mb-2">
                            <Text className="text-xs font-bold text-gray-500 mb-3">My reply</Text>
                            
                            <View className="flex-row items-start">
                                <View className="w-10 h-10 rounded-full bg-[#FFDBC9] items-center justify-center mr-3">
                                    <Text className="text-xs font-bold text-[#1C1C1E]">AS</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xs text-gray-500 mb-1">
                                        <Text className="font-medium text-[#1C1C1E]">Alex Smith</Text> · Just now
                                    </Text>
                                    <Text className="text-base text-[#1C1C1E] leading-6 mb-2">
                                        {replyText}
                                    </Text>
                                    <TouchableOpacity className="flex-row items-center gap-1">
                                        <Ionicons name="heart-outline" size={14} color="#1C1C1E" />
                                        <Text className="text-xs font-bold text-[#1C1C1E]">Like</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Comments List */}
                <View className="px-6">
                    {COMMENTS.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}