import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import ColorPicker, { BlueSlider, GreenSlider, Panel4, Panel5, RedSlider } from 'reanimated-color-picker';

type Props = {
    initialColor?: string;
    onSelectColor: (color: string) => void;
};

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

const ColorPickerSheet = forwardRef<BottomSheetModal, Props>(({ initialColor = '#8B7EFF', onSelectColor }, ref) => {
    const snapPoints = useMemo(() => ['70%'], []);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [activeTab, setActiveTab] = useState<'Grid' | 'Spectrum' | 'Sliders'>('Spectrum');

    const [colorInfo, setColorInfo] = useState({ hex: initialColor, ...hexToRgb(initialColor) });

    const GRID_COLORS = useMemo(() => {
        const colors = [];
        for (let i = 0; i < 12; i++) {
            const val = Math.round(255 - (i * (255 / 11))).toString(16).padStart(2, '0');
            colors.push(`#${val}${val}${val}`);
        }
        for (let row = 0; row < 9; row++) {
            const s = row < 4 ? 100 : 100 - (row - 4) * 12;
            const l = row < 4 ? 90 - row * 12 : 42 - (row - 4) * 5;
            for (let col = 0; col < 12; col++) {
                const h = col * 30;
                colors.push(`hsl(${h}, ${s}%, ${l}%)`);
            }
        }
        return colors;
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
        ), []
    );

    const updateColorState = (color: any) => {
        const rgbStr = color.rgb;
        const rgbMatch = rgbStr.match(/\d+/g);

        if (rgbMatch) {
            setColorInfo({
                hex: color.hex,
                r: parseInt(rgbMatch[0], 10),
                g: parseInt(rgbMatch[1], 10),
                b: parseInt(rgbMatch[2], 10),
            });
        }
        setSelectedColor(color.hex);
    };

    const onColorChange = (color: any) => {
        'worklet';
        runOnJS(updateColorState)(color);
    };

    const handleSave = () => {
        onSelectColor(selectedColor);
        (ref as any).current?.dismiss();
    };

    const thumbStyle = {
        borderWidth: 2,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#F3F4F6', borderRadius: 32 }}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 40 }}
        >
            <BottomSheetView className="flex-1 px-5 pt-2 pb-8">

                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <Ionicons name="color-wand-outline" size={24} color="black" />

                    {/* Tabs */}
                    <View className="flex-row bg-[#E5E7EB] rounded-full p-1">
                        {(['Grid', 'Spectrum', 'Sliders'] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`px-5 py-1.5 rounded-full ${activeTab === tab ? 'bg-white' : ''}`}
                                style={activeTab === tab ? {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 2,
                                    elevation: 1
                                } : {}}
                            >
                                <Text className={`text-[13px] font-semibold ${activeTab === tab ? 'text-black' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 w-full items-center">
                    <ColorPicker
                        style={{ width: '100%' }}
                        value={selectedColor}
                        onChange={onColorChange}
                    >
                        {activeTab === 'Grid' && (
                            <View className="w-full pt-2">
                                {/* <View
                                    className="w-full rounded-xl overflow-hidden border border-gray-200 bg-white"
                                    style={{ aspectRatio: 1 }} // Forces the wrapper to be a perfect square
                                >
                                    <Swatches
                                        colors={GRID_COLORS}
                                        style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
                                        swatchStyle={{
                                            width: `${100 / 12}%`, // Exactly 12 columns
                                            height: `${100 / 9}%`, // Exactly 10 rows
                                            margin: 0,
                                            borderRadius: 0
                                        }}
                                    />
                                </View> */}
                                <Panel5 style={{ width: '100%', height: 300, borderRadius: 12 }} />
                            </View>
                        )}

                        {/* --- SPECTRUM TAB --- */}
                        {activeTab === 'Spectrum' && (
                            <View className="w-full pt-2">
                                <Panel4
                                    style={{ width: '100%', borderRadius: 8 }}
                                    boundedThumb={true}
                                    thumbSize={28}
                                    thumbColor="transparent"
                                    thumbStyle={thumbStyle}
                                />
                            </View>
                        )}

                        {activeTab === 'Sliders' && (
                            <View className="w-full gap-5 mt-2">
                                {/* RED Slider Row */}
                                <View>
                                    <Text className="text-[10px] font-bold text-gray-400 mb-2">RED</Text>
                                    <View className="flex-row items-center gap-4">
                                        <RedSlider
                                            style={{ flex: 1, height: 28, borderRadius: 14 }}
                                            thumbSize={24}
                                            thumbColor="transparent"
                                            thumbStyle={thumbStyle}
                                        />
                                        <View className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 min-w-[55px] items-center" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}>
                                            <Text className="font-semibold text-black">{colorInfo.r}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* GREEN Slider Row */}
                                <View>
                                    <Text className="text-[10px] font-bold text-gray-400 mb-2">GREEN</Text>
                                    <View className="flex-row items-center gap-4">
                                        <GreenSlider
                                            style={{ flex: 1, height: 28, borderRadius: 14 }}
                                            thumbSize={24}
                                            thumbColor="transparent"
                                            thumbStyle={thumbStyle}
                                        />
                                        <View className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 min-w-[55px] items-center" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}>
                                            <Text className="font-semibold text-black">{colorInfo.g}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* BLUE Slider Row */}
                                <View>
                                    <Text className="text-[10px] font-bold text-gray-400 mb-2">BLUE</Text>
                                    <View className="flex-row items-center gap-4">
                                        <BlueSlider
                                            style={{ flex: 1, height: 28, borderRadius: 14 }}
                                            thumbSize={24}
                                            thumbColor="transparent"
                                            thumbStyle={thumbStyle}
                                        />
                                        <View className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 min-w-[55px] items-center" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}>
                                            <Text className="font-semibold text-black">{colorInfo.b}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* HEX Display */}
                                <View className="flex-row items-center justify-end mt-4 gap-3">
                                    <Text className="text-[#007AFF] font-medium text-[15px]">sRGB Hex Color #</Text>
                                    <View className="bg-white px-4 py-2 rounded-lg border border-gray-100 min-w-[85px] items-center" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }}>
                                        <Text className="font-semibold text-black tracking-widest">{colorInfo.hex.replace('#', '').toUpperCase()}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ColorPicker>
                </View>

                {/* Footer Divider */}
                <View className="w-full h-[1px] bg-gray-200/80 my-4" />

                {/* Footer Preview & Save */}
                <View className="flex-row items-center gap-4">
                    <View
                        style={{ backgroundColor: selectedColor }}
                        className="w-12 h-12 rounded-xl border border-gray-200"
                    />
                    <TouchableOpacity
                        className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                        onPress={handleSave}
                    >
                        <Ionicons name="add" size={20} color="black" />
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default ColorPickerSheet;