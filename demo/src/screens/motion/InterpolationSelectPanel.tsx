import React, {useState, useEffect} from 'react';
import {View, Text, Button, Slider, Picker, Colors} from 'react-native-ui-lib';
import {Springs, Easings, Durations, type InterpolationSpecs, SpringInterpolationSpecs, TweenInterpolationSpecs} from 'react-native-motion-lib';

/** Interpolation specs with optional token names (for panel value/callback). */
export type TokenizedSpringInterpolationSpecs = SpringInterpolationSpecs & {springTokenName?: string};
export type TokenizedTweenInterpolationSpecs = TweenInterpolationSpecs & {durationTokenName?: string};
export type TokenizedInterpolationSpecs =
  TokenizedSpringInterpolationSpecs | TokenizedTweenInterpolationSpecs;

export function getInterpolationGist(interpolation: TokenizedInterpolationSpecs): string {
  if (interpolation.type === 'spring') {
    return `spring(${interpolation.springTokenName ??
        `${interpolation.spring.damping}, ${interpolation.spring.stiffness}, ${interpolation.spring.mass}kg`})`;
  } else if (interpolation.type === 'tween') {
    return `tween(${interpolation.durationTokenName ?? `${interpolation.duration}ms`}, ${interpolation.easingName})`;
  }
  return '';
}
  
type SpringConfigurationPanelProps = {
  initialSpec?: TokenizedSpringInterpolationSpecs;
  onSpecChange: (spec: TokenizedSpringInterpolationSpecs) => void;
};

function SpringConfigurationPanel({initialSpec, onSpecChange}: SpringConfigurationPanelProps) {
  const DAMPING_DEFAULT = 30;
  const STIFFNESS_DEFAULT = 200;
  const MASS_DEFAULT = 1;
  const spec = initialSpec?.type === 'spring' ? initialSpec : {
    type: 'spring',
    spring: {
      damping: DAMPING_DEFAULT,
      stiffness: STIFFNESS_DEFAULT,
      mass: MASS_DEFAULT
    },
    springTokenName: null
  };

  const [damping, setDamping] = useState(spec.spring.damping);
  const [stiffness, setStiffness] = useState(spec.spring.stiffness);
  const [mass, setMass] = useState(spec.spring.mass);
  const [activeSpringToken, setActiveSpringToken] = useState<string | null>(spec.springTokenName);

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
            onPress={() => {
              setDamping(token.damping);
              setStiffness(token.stiffness);
              setMass(token.mass);
              setActiveSpringToken(name);
              onSpecChange({
                type: 'spring',
                spring: {damping: token.damping, stiffness: token.stiffness, mass: token.mass},
                springTokenName: name
              });
            }}
          />
        ))}
      </View>

      <View marginB-s4>
        <View row spread marginB-s2>
          <Text text80>Damping: {damping}</Text>
        </View>
        <Slider
          value={spec.spring.damping}
          thumbTintColor={Colors.$backgroundGeneralHeavy}
          minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
          minimumValue={10}
          maximumValue={120}
          step={10}
          onValueChange={(v: number) => {
            setDamping(v);
            setActiveSpringToken(null);
            onSpecChange({
              type: 'spring',
              spring: {damping: v, stiffness, mass},
              springTokenName: null
            });
          }}
        />
      </View>

      <View marginB-s4>
        <View row spread marginB-s2>
          <Text text80>Stiffness: {stiffness}</Text>
        </View>
        <Slider
          value={spec.spring.stiffness}
          thumbTintColor={Colors.$backgroundGeneralHeavy}
          minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
          minimumValue={100}
          maximumValue={1000}
          step={100}
          onValueChange={(v: number) => {
            setStiffness(v);
            setActiveSpringToken(null);
            onSpecChange({
              type: 'spring',
              spring: {damping, stiffness: v, mass},
              springTokenName: null
            });
          }}
        />
      </View>

      <View marginB-s4>
        <View row spread marginB-s2>
          <Text text80>Mass: {mass}</Text>
        </View>
        <Slider
          value={spec.spring.mass}
          thumbTintColor={Colors.$backgroundGeneralHeavy}
          minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
          minimumValue={1}
          maximumValue={10}
          step={1}
          onValueChange={(v: number) => {
            setMass(v);
            setActiveSpringToken(null);
            onSpecChange({
              type: 'spring',
              spring: {damping, stiffness, mass: v},
              springTokenName: null
            });
          }}
        />
      </View>
    </View>
  );
}

type TweenConfigurationPanelProps = {
  initialSpec?: TokenizedTweenInterpolationSpecs;
  easingItems: Array<{label: string; value: string}>;
  onSpecChange: (spec: TokenizedTweenInterpolationSpecs) => void;
};

function TweenConfigurationPanel({
  initialSpec,
  easingItems,
  onSpecChange
}: TweenConfigurationPanelProps) {
  const [duration, setDuration] = useState(initialSpec?.duration ?? 100);
  const [easingName, setEasingName] = useState(initialSpec?.easingName ?? 'standard');
  const [activeDurationToken, setActiveDurationToken] = useState<string | null>(initialSpec?.durationTokenName ?? null);

  return (
    <View>
      <Text text60M marginB-s3>
        Tween Configuration
      </Text>

      <View row marginB-s4 center>
        {Object.entries(Durations).map(([name, durations]) => (
          <Button
            key={name}
            label={name}
            size={Button.sizes.small}
            marginR-s2
            bg-$backgroundGeneralHeavy
            outlineColor={Colors.$backgroundGeneralHeavy}
            outline={activeDurationToken !== name}
            onPress={() => {
              setDuration(durations.default);
              setActiveDurationToken(name);

              onSpecChange({
                type: 'tween',
                duration: durations.default,
                durationTokenName: name,
                easingName
              });
            }}
          />
        ))}
      </View>

      <View marginB-s4>
        <View row spread marginB-s2>
          <Text text80>Duration: {duration}ms</Text>
        </View>
        <Slider
          value={initialSpec?.duration ?? 100}
          thumbTintColor={Colors.$backgroundGeneralHeavy}
          minimumTrackTintColor={Colors.$backgroundGeneralHeavy}
          minimumValue={100}
          maximumValue={2000}
          step={100}
          onValueChange={(value: number) => {
            setDuration(value);
            setActiveDurationToken(null);

            onSpecChange({
              type: 'tween',
              easingName,
              duration: value,
              durationTokenName: null
            });
          }}
        />
      </View>

      <View marginB-s4>
        <Text text80 marginB-s2>Easing:</Text>
        <Picker
          placeholder="Select easing"
          value={easingName}
          onChange={(item) => {
            setEasingName(item as string);
            onSpecChange({
              type: 'tween',
              easingName: item,
              duration,
              durationTokenName: activeDurationToken
            });
          }}
          items={easingItems}
        />
      </View>
    </View>
  );
}

type InterpolationSelectPanelProps = {
  value?: TokenizedInterpolationSpecs;
  onInterpolationSelected: (interpolation: TokenizedInterpolationSpecs) => void;
};

const easingItems = Object.keys(Easings).map(name => ({
  label: name,
  value: name
}));

export function InterpolationSelectPanel({value, onInterpolationSelected}: InterpolationSelectPanelProps) {
  const [interpolationType, setInterpolationType] = useState<InterpolationSpecs['type']>(value?.type ?? 'spring');

  useEffect(() => {
    setInterpolationType(value?.type ?? 'spring');
  }, [value]);
  
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
          label="Tween"
          size={Button.sizes.small}
          bg-$backgroundGeneralHeavy
          outlineColor={Colors.$backgroundGeneralHeavy}
          outline={interpolationType !== 'tween'}
          onPress={() => setInterpolationType('tween')}
        />
      </View>

      {interpolationType === 'spring' ? (
        <SpringConfigurationPanel
          initialSpec={value as TokenizedSpringInterpolationSpecs}
          onSpecChange={(spec: TokenizedSpringInterpolationSpecs) => {
            onInterpolationSelected(spec);
          }}
        />
      ) : (
        <TweenConfigurationPanel
          easingItems={easingItems}
          initialSpec={value as TokenizedTweenInterpolationSpecs}
          onSpecChange={(spec: TokenizedTweenInterpolationSpecs) => {
            onInterpolationSelected(spec);
          }}
        />
      )}
    </View>
  );
}
