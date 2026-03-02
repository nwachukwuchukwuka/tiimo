import { EMOJI_DATA } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useRef, useState } from 'react';
import { ColorValue, LayoutAnimation, Modal, ScrollView, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPickerSheet from './ColorPickerSheet';


type ColorItem = {
    id: string;
    colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
    color?: string;
    isNone?: boolean;
};

const DEFAULT_COLORS: ColorItem[] = [
    { id: 'rainbow', colors: ['#FCA5A5', '#FCD34D', '#86EFAC'] },
    { id: 'none', color: 'transparent', isNone: true },
    { id: 'purple', color: '#E9D5FF' },
    { id: 'blue', color: '#BFDBFE' },
    { id: 'green', color: '#BBF7D0' },
    { id: 'yellow', color: '#FEF08A' },
    { id: 'orange', color: '#FED7AA' },
    { id: 'red', color: '#FECACA' },
    { id: 'pink', color: '#FBCFE8' },
    { id: 'gray', color: '#F3F4F6' },
];

type VisualsData = {
    bg: string;
    icon: string;
    type: 'color' | 'gradient';
};

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (data: VisualsData) => void;
    initialData?: VisualsData;
};

export default function ChooseVisualsModal({ visible, onClose, onSave, initialData }: Props) {
    const [activeTab, setActiveTab] = useState<'color' | 'emoji'>('emoji');
    const [selectedBg, setSelectedBg] = useState(initialData?.bg || '#FEF08A');
    const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || '☀️');
    const [searchText, setSearchText] = useState('');

    const [dynamicColors, setDynamicColors] = useState(DEFAULT_COLORS);
    const [isEditMode, setIsEditMode] = useState(false);

    const colorPickerRef = useRef<BottomSheetModal>(null);

    // Filter Logic
    const filteredEmojis = useMemo(() => {
        if (!searchText) return EMOJI_DATA;
        const lowerSearch = searchText.toLowerCase();
        return EMOJI_DATA.filter(item =>
            item.char.includes(lowerSearch) || item.keywords.includes(lowerSearch)
        );
    }, [searchText]);

    const handleSave = () => {
        onSave({
            bg: selectedBg,
            icon: selectedIcon,
            type: selectedBg.includes('gradient') ? 'gradient' : 'color'
        });
        onClose();
    };

    // --- Color Deletion Logic ---
    const handleLongPress = () => {
        Vibration.vibrate(50);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsEditMode(!isEditMode);
    };

    const handleDeleteColor = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDynamicColors(prev => prev.filter(c => c.id !== id));
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <SafeAreaView className="flex-1 bg-white">

                        {/* Header */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
                            <TouchableOpacity onPress={onClose} className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text className="text-lg font-bold text-[#1C1C1E]">Choose visuals</Text>
                            <TouchableOpacity onPress={handleSave} className="w-10 h-10 bg-[#8B7EFF] rounded-full items-center justify-center">
                                <Ionicons name="checkmark" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Preview Section */}
                        <View className="items-center py-8 bg-gray-50/50">
                            <View
                                className="w-32 h-32 rounded-full items-center justify-center shadow-sm relative"
                                style={{ backgroundColor: selectedBg === 'transparent' ? '#fff' : selectedBg }}
                            >
                                {selectedBg === 'transparent' && <View className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full" />}
                                <Text style={{ fontSize: 64 }}>{selectedIcon}</Text>

                                {selectedIcon !== '' && (
                                    <TouchableOpacity
                                        onPress={() => setSelectedIcon('')}
                                        className="absolute top-0 right-0 bg-gray-200 rounded-full p-1.5"
                                    >
                                        <Ionicons name="close" size={14} color="gray" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Tabs */}
                        <View className="flex-row justify-center gap-4 py-4 px-6 border-b border-gray-100">
                            <TouchableOpacity
                                onPress={() => setActiveTab('color')}
                                className={`flex-1 py-3 rounded-full items-center border ${activeTab === 'color' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <Ionicons name="color-palette" size={20} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setActiveTab('emoji')}
                                className={`flex-1 py-3 rounded-full items-center border ${activeTab === 'emoji' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <Text style={{ fontSize: 18 }}>😃</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-1 py-3 rounded-full items-center border border-gray-200">
                                <Ionicons name="camera-outline" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Content Area */}
                        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>

                            {activeTab === 'color' && (
                                <View className="flex-row flex-wrap gap-4 justify-start mt-2">
                                    {dynamicColors.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            activeOpacity={0.7}
                                            onLongPress={handleLongPress}
                                            onPress={() => {
                                                if (isEditMode) {
                                                    setIsEditMode(false);
                                                } else {
                                                    if (item.id === 'rainbow') {
                                                        colorPickerRef.current?.present();
                                                    } else {
                                                        setSelectedBg(item.color || '#fff');
                                                    }
                                                }
                                            }}
                                            className={`w-[19%] aspect-square rounded-full mb-2 items-center justify-center ${selectedBg === item.color ? 'border-2 border-black' : ''}`}
                                            style={{ overflow: 'visible' }}
                                        >
                                            <View className="w-full h-full rounded-full overflow-hidden">
                                                {item.id === 'rainbow' ? (
                                                    <LinearGradient colors={item.colors!} style={{ width: '100%', height: '100%' }} />
                                                ) : item.isNone ? (
                                                    <View className="w-full h-full bg-white border border-gray-200 items-center justify-center">
                                                        <View className="w-full h-[1px] bg-black rotate-45" />
                                                    </View>
                                                ) : (
                                                    <View style={{ backgroundColor: item.color, width: '100%', height: '100%' }} />
                                                )}
                                            </View>

                                            {/* DELETE BADGE */}
                                            {isEditMode && item.id !== 'rainbow' && item.id !== 'none' && (
                                                <TouchableOpacity
                                                    onPress={() => handleDeleteColor(item.id)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: -2,
                                                        right: -2,
                                                        backgroundColor: 'white',
                                                        borderRadius: 10,
                                                    }}
                                                >
                                                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                                                </TouchableOpacity>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {activeTab === 'emoji' && (
                                <View>
                                    {/* Search Bar */}
                                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-6">
                                        <Ionicons name="search" size={20} color="gray" />
                                        <TextInput
                                            placeholder="Search (e.g. food, happy)"
                                            placeholderTextColor="#9CA3AF"
                                            className="flex-1 ml-2 text-base text-black"
                                            value={searchText}
                                            onChangeText={setSearchText}
                                            autoCorrect={false}
                                        />
                                        {searchText.length > 0 && (
                                            <TouchableOpacity onPress={() => setSearchText('')}>
                                                <Ionicons name="close-circle" size={18} color="gray" />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    <Text className="text-xs font-bold text-gray-400 mb-4 tracking-wider">
                                        {searchText ? `RESULTS (${filteredEmojis.length})` : 'POPULAR'}
                                    </Text>

                                    <View className="flex-row flex-wrap gap-3 pb-10">
                                        {filteredEmojis.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => setSelectedIcon(item.char)}
                                                className={`w-14 h-14 items-center justify-center rounded-2xl ${selectedIcon === item.char ? 'bg-gray-100 border-2 border-black' : 'bg-gray-50'}`}
                                            >
                                                <Text style={{ fontSize: 28 }}>{item.char}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}

                        </ScrollView>

                        <ColorPickerSheet
                            ref={colorPickerRef}
                            initialColor={selectedBg.startsWith('#') ? selectedBg : '#8B7EFF'}
                            onSelectColor={(color) => {
                                const newColorObj = { id: `custom-${Date.now()}`, color };
                                setDynamicColors(prev => [...prev, newColorObj]);
                                setSelectedBg(color);
                            }}
                        />
                    </SafeAreaView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </Modal>
    );
}