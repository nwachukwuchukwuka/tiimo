// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// // Simplified lookup for demo purposes. 
// // In a real app, this data would come from the same source of truth as the Manager.
// const TAG_LOOKUP: Record<string, { label: string; icon: string; bg: string; color: string }> = {
//     '1': { label: 'Household', icon: 'basket', bg: '#fef3c7', color: '#92400e' },
//     '2': { label: 'Human needs', icon: 'water', bg: '#dbeafe', color: '#1e40af' },
//     // ... map remaining IDs if needed for full demo fidelity
//     'custom': { label: 'Custom', icon: 'tag', bg: '#F3F4F6', color: '#374151' }
// };

// type Props = {
//     tagIds: string[];
//     onAddPress: () => void;
// };

// export default function TagList({ tagIds, onAddPress }: Props) {
//     return (
//         <View className="mt-4 flex-row items-center">
//             {/* Add Button */}
//             <TouchableOpacity
//                 onPress={onAddPress}
//                 className="w-10 h-10 bg-[#E5E5EA] rounded-full items-center justify-center mr-2"
//             >
//                 <MaterialCommunityIcons name="plus" size={24} color="#1C1C1E" />
//             </TouchableOpacity>

//             {/* Selected Tags Horizontal Scroll */}
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
//                 {tagIds.map((id) => {
//                     // Fallback for demo if ID not in static lookup
//                     const tag = TAG_LOOKUP[id] || { label: 'Tag', icon: 'tag', bg: '#F3F4F6', color: '#374151' };
//                     return (
//                         <View key={id} style={{ backgroundColor: tag.bg }} className="flex-row items-center px-3 py-2 rounded-xl">
//                             {/* @ts-ignore */}
//                             <MaterialCommunityIcons name={tag.icon} size={14} color={tag.color} />
//                             <Text style={{ color: tag.color }} className="ml-1.5 font-bold text-xs">{tag.label}</Text>
//                         </View>
//                     );
//                 })}
//             </ScrollView>
//         </View>
//     );
// }


import { TagItem } from '@/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    tagIds: string[];
    allTags: TagItem[]; // 1. Added Prop
    onAddPress: () => void;
};

export default function TagList({ tagIds, allTags, onAddPress }: Props) {
    return (
        <View className="mt-4 flex-row items-center">
            {/* Add Button */}
            <TouchableOpacity
                onPress={onAddPress}
                className="w-10 h-10 bg-[#E5E5EA] rounded-full items-center justify-center mr-2"
            >
                <MaterialCommunityIcons name="plus" size={24} color="#1C1C1E" />
            </TouchableOpacity>

            {/* Selected Tags Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {tagIds.map((id) => {
                    // 2. Find tag data from the central list
                    const tag = allTags.find(t => t.id === id) || { label: 'Unknown', icon: 'tag', bg: '#F3F4F6', color: '#374151' };

                    return (
                        <View key={id} style={{ backgroundColor: tag.bg }} className="flex-row items-center px-3 py-2 rounded-xl">
                            {/* @ts-ignore */}
                            <MaterialCommunityIcons name={tag.icon} size={14} color={tag.color} />
                            <Text style={{ color: tag.color }} className="ml-1.5 font-bold text-xs">{tag.label}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}