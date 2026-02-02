import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, Button, Slider, Picker, Colors} from 'react-native-ui-lib';
import {Springs, Easings, Durations, type InterpolationSpecs, type Spring, SpringInterpolationSpecs, TimeInterpolationSpecs} from 'react-native-motion-lib';

type SpringConfigurationPanelProps = {
  damping: number;
  stiffness: number;
  mass: number;
  activeSpringToken: string | null;
  onDampingChange: (value: number) => void;
  onStiffnessChange: (value: number) => void;
  onMassChange: (value: number) => void;
  onSpringTokenPress: (name: string, token: Spring) => void;
};

function SpringConfigurationPanel({
  damping,
  stiffness,
  mass,
  activeSpringToken,
  onDampingChange,
  onStiffnessChange,
  onMassChange,
  onSpringTokenPress
}: SpringConfigurationPanelProps) {
  return (
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
            onPress={() => onSpringTokenPress(name, token)}
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
          onValueChange={onDampingChange}
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
          onValueChange={onStiffnessChange}
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
          onValueChange={onMassChange}
        />
      </View>
    </View>
  );
}

type TimingConfigurationPanelProps = {
  duration: number;
  easingName: string;
  activeDurationToken: string | null;
  easingItems: Array<{label: string; value: string}>;
  onDurationChange: (value: number) => void;
  onEasingChange: (name: string) => void;
  onDurationTokenPress: (name: string, token: {default: number; slow: number}) => void;
};

function TimingConfigurationPanel({
  duration,
  easingName,
  activeDurationToken,
  easingItems,
  onDurationChange,
  onEasingChange,
  onDurationTokenPress
}: TimingConfigurationPanelProps) {
  return (
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
            onPress={() => onDurationTokenPress(name, token)}
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
          onValueChange={onDurationChange}
        />
      </View>

      <View marginB-s4>
        <Text text80 marginB-s2>Easing:</Text>
        <Picker
          placeholder="Select easing"
          value={easingName}
          onChange={(item) => onEasingChange(item as string)}
          items={easingItems}
        />
      </View>
    </View>
  );
}

type InterpolationSelectPanelProps = {
  value?: InterpolationSpecs;
  onInterpolationSelected: (interpolation: InterpolationSpecs) => void;
};

export function InterpolationSelectPanel({value, onInterpolationSelected}: InterpolationSelectPanelProps) {
  const initialType = value?.type;
  const [interpolationType, setInterpolationType] = useState<InterpolationSpecs['type']>(initialType);
  
  // Spring configuration
  const DAMPING_INIT = 30;
  const STIFFNESS_INIT = 200;
  const MASS_INIT = 1;
  const [damping, setDamping] = useState(initialType === 'spring' ? (value as SpringInterpolationSpecs).spring.damping : DAMPING_INIT);
  const [stiffness, setStiffness] = useState(initialType === 'spring' ? (value as SpringInterpolationSpecs).spring.stiffness : STIFFNESS_INIT);
  const [mass, setMass] = useState(initialType === 'spring' ? (value as SpringInterpolationSpecs).spring.mass : MASS_INIT);
  const [activeSpringToken, setActiveSpringToken] = useState<string | null>(null);
  
  // Timing configuration
  const DURATION_INIT = 800;
  const EASING_INIT = 'standard';
  const [duration, setDuration] = useState(initialType === 'timing' ? (value as TimeInterpolationSpecs).duration : DURATION_INIT);
  const [easingName, setEasingName] = useState<string>(initialType === 'timing' ? (value as TimeInterpolationSpecs).easingName : EASING_INIT);
  const [activeDurationToken, setActiveDurationToken] = useState<string | null>(null);

  const spring: Spring = useMemo(() => ({
    damping,
    stiffness,
    mass
  }), [damping, stiffness, mass]);

  const interpolation: InterpolationSpecs = useMemo(() => {
    if (interpolationType === 'spring') {
      return {type: 'spring', spring};
    } else {
      return {type: 'timing', duration, easingName};
    }
  }, [interpolationType, spring, duration, easingName]);

  useEffect(() => {
    onInterpolationSelected(interpolation);
  }, [interpolation, onInterpolationSelected]);

  useEffect(() => {
    setInterpolationType(value?.type ?? 'spring');
  }, [value]);
  
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
          outline={interpolationType !== 'spring'}
          onPress={() => setInterpolationType('spring')}
        />
        <Button
          label="Timing"
          size={Button.sizes.small}
          bg-$backgroundGeneralHeavy
          outlineColor={Colors.$backgroundGeneralHeavy}
          outline={interpolationType !== 'timing'}
          onPress={() => setInterpolationType('timing')}
        />
      </View>

      {interpolationType === 'spring' ? (
        <SpringConfigurationPanel
          damping={damping}
          stiffness={stiffness}
          mass={mass}
          activeSpringToken={activeSpringToken}
          onDampingChange={(value: number) => {
            setDamping(value);
            setActiveSpringToken(null);        
          }}
          onStiffnessChange={(value: number) => {
            setStiffness(value);
            setActiveSpringToken(null);
          }}
          onMassChange={(value: number) => {
            setMass(value);
            setActiveSpringToken(null);
          }}
          onSpringTokenPress={(tokenName: string, token: Spring) => {
            setDamping(token.damping);
            setStiffness(token.stiffness);
            setMass(token.mass);
            setActiveSpringToken(tokenName);        
          }}
        />
      ) : (
        <TimingConfigurationPanel
          duration={duration}
          easingName={easingName}
          activeDurationToken={activeDurationToken}
          easingItems={easingItems}
          onEasingChange={setEasingName}
          onDurationChange={(value: number) => {
            setDuration(value);
            setActiveDurationToken(null);
          }}
          onDurationTokenPress={(tokenName: string, token: {default: number; slow: number}) => {
            setDuration(token.default);
            setActiveDurationToken(tokenName);
          }}
        />
      )}
    </View>
  );
}
