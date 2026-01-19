import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, Button, Slider, Picker, Colors} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import type {Spring, Easing} from 'react-native-motion-lib';
import {Springs, Easings, Durations} from 'react-native-motion-lib';
import type {AnimationProps} from 'react-native-motion-lib';

type AnimationType = 'spring' | 'timing';

type AnimationConfigurationPanelProps = {
  onAnimationSelected: (animation: AnimationProps) => void;
};

export function AnimationConfigurationPanel({onAnimationSelected}: AnimationConfigurationPanelProps) {
  const [animationType, setAnimationType] = useState<AnimationType>('spring');
  
  // Spring configuration
  const [damping, setDamping] = useState(30);
  const [stiffness, setStiffness] = useState(200);
  const [mass, setMass] = useState(1);
  const [activeSpringToken, setActiveSpringToken] = useState<string | null>(null);
  
  // Timing configuration
  const [duration, setDuration] = useState(800);
  const [easingName, setEasingName] = useState<string>('standard');
  const [activeDurationToken, setActiveDurationToken] = useState<string | null>(null);

  const spring: Spring = useMemo(() => ({
    damping,
    stiffness,
    mass
  }), [damping, stiffness, mass]);

  const easing: Easing = useMemo(() => {
    return Easings[easingName as keyof typeof Easings] as Easing;
  }, [easingName]);

  const animation: AnimationProps = useMemo(() => {
    if (animationType === 'spring') {
      return { spring };
    } else {
      return {
        duration,
        easing
      };
    }
  }, [animationType, spring, duration, easing]);

  useEffect(() => {
    onAnimationSelected(animation);
  }, [animation, onAnimationSelected]);
  
  const applySpringToken = (tokenName: string, token: Spring) => {
    setDamping(token.damping);
    setStiffness(token.stiffness);
    setMass(token.mass);
    setActiveSpringToken(tokenName);
  };

  const handleDampingChange = (value: number) => {
    setDamping(value);
    setActiveSpringToken(null);
  };

  const handleStiffnessChange = (value: number) => {
    setStiffness(value);
    setActiveSpringToken(null);
  };

  const handleMassChange = (value: number) => {
    setMass(value);
    setActiveSpringToken(null);
  };

  const applyDurationToken = (tokenName: string, tokenValue: {default: number; slow: number}) => {
    setDuration(tokenValue.default);
    setActiveDurationToken(tokenName);
  };

  const handleDurationChange = (value: number) => {
    setDuration(value);
    setActiveDurationToken(null);
  };

  const easingItems = Object.keys(Easings).map(name => ({
    label: name,
    value: name
  }));

  return (
    <View marginT-s6>
      <View row marginB-s4 centerH>
        <Button
          label="Spring"
          size={Button.sizes.small}
          marginR-s2
          bg-$backgroundGeneralHeavy
          outlineColor={Colors.$backgroundGeneralHeavy}
          outline={animationType !== 'spring'}
          onPress={() => setAnimationType('spring')}
        />
        <Button
          label="Timing"
          size={Button.sizes.small}
          bg-$backgroundGeneralHeavy
          outlineColor={Colors.$backgroundGeneralHeavy}
          outline={animationType !== 'timing'}
          onPress={() => setAnimationType('timing')}
        />
      </View>

      {animationType === 'spring' ? (
        <View>
          <Text text60M marginB-s3>
            Spring Configuration
          </Text>

          <View row marginB-s4 center>
            {Object.entries(Springs).map(([name, token]) => (
              <Button
                key={name}
                label={name}
                size={Button.sizes.small}
                marginR-s2
                bg-$backgroundGeneralHeavy
                outlineColor={Colors.$backgroundGeneralHeavy}
                outline={activeSpringToken !== name}
                onPress={() => applySpringToken(name, token)}
              />
            ))}
          </View>

          <View marginB-s4>
            <View row spread marginB-s2>
              <Text text80>Damping: {damping}</Text>
            </View>
            <Slider
              value={damping}
              thumbTintColor={Colors.$backgroundGeneralHeavy}
              minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
              minimumValue={10}
              maximumValue={120}
              step={10}
              
              onValueChange={handleDampingChange}
            />
          </View>

          <View marginB-s4>
            <View row spread marginB-s2>
              <Text text80>Stiffness: {stiffness}</Text>
            </View>
            <Slider
              value={stiffness}
              thumbTintColor={Colors.$backgroundGeneralHeavy}
              minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
              minimumValue={100}
              maximumValue={1000}
              step={100}
              onValueChange={handleStiffnessChange}
            />
          </View>

          <View marginB-s4>
            <View row spread marginB-s2>
              <Text text80>Mass: {mass}</Text>
            </View>
            <Slider
              value={mass}
              thumbTintColor={Colors.$backgroundGeneralHeavy}
              minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
              minimumValue={1}
              maximumValue={10}
              step={1}
              onValueChange={handleMassChange}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text text60M marginB-s3>
            Timing Configuration
          </Text>

          <View row marginB-s4 center>
            {Object.entries(Durations).map(([name, token]) => (
              <Button
                key={name}
                label={name}
                size={Button.sizes.small}
                marginR-s2
                bg-$backgroundGeneralHeavy
                outlineColor={Colors.$backgroundGeneralHeavy}
                outline={activeDurationToken !== name}
                onPress={() => applyDurationToken(name, token)}
              />
            ))}
          </View>

          <View marginB-s4>
            <View row spread marginB-s2>
              <Text text80>Duration: {duration}ms</Text>
            </View>
            <Slider
              value={duration}
              thumbTintColor={Colors.$backgroundGeneralHeavy}
              minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
              minimumValue={100}
              maximumValue={2000}
              step={100}
              onValueChange={handleDurationChange}
            />
          </View>

          <View marginB-s4>
            <Text text80 marginB-s2>Easing:</Text>
            <Picker
              placeholder="Select easing"
              value={easingName}
              onChange={(item) => setEasingName(item as string)}
              items={easingItems}
            />
          </View>
        </View>
      )}
    </View>
  );
}
