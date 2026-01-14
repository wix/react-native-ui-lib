import React from 'react';
import {type ViewStyle} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, Easing} from 'react-native-reanimated';
import { Easings } from './tokens';

export function EasingDemo() {
    const duration = 1000;
    const distance = 250;

    const easings = Object.entries(Easings).map(([name, easing]) => ({
        name,
        easing,
        progress: useSharedValue(0),
    }));

    const animateAll = () => {
        easings.forEach((easing) => {
            easing.progress.value = withTiming((easing.progress.value === 0 ? 1 : 0), { duration, easing: easing.easing });
        });
    }

    const boxStyle: ViewStyle = {
        width: 25,
        height: 25,
        backgroundColor: `hsl(40, 85.20%, 47.60%)`,
        borderRadius: 25,
    };

    return (
        <View>
            {easings.map(({ name, progress }, index) => {
                const animatedStyle = useAnimatedStyle(() => ({
                    transform: [{ translateX: progress.value * distance }],
                }));

                return (
                    <View key={name} marginB-s1 row centerV flex-1>
                        <Text text90 width={70} numberOfLines={1}>{name}</Text>
                        <Animated.View style={[animatedStyle, boxStyle]}/>
                    </View>
                );
            })}

            <Button label="animate all" onPress={animateAll} />
        </View>
    );
}
