import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Colors, Text, View} from 'react-native-ui-lib';

import {
  createScaleAnimation,
  createTranslationXAnimation,
  createTranslationYAnimation,
  createRotationZAnimation,
  createOpacityAnimation,
  AnimationStack,
  Springs,
  type AnimationSpecs
} from 'react-native-motion-lib';

import {AnimationConfigurationPanel} from '../AnimationConfigurationPanel';
import {ScaleConfigurationPanel} from './ScaleConfigurationPanel';
import {TranslationXConfigurationPanel} from './TranslationXConfigurationPanel';
import {TranslationYConfigurationPanel} from './TranslationYConfigurationPanel';
import {RotationZConfigurationPanel} from './RotationZConfigurationPanel';
import {OpacityConfigurationPanel} from './OpacityConfigurationPanel';

const SCALE_INIT = 1;
const SCALE_TARGET = 1.5;
const TRANSLATION_X_INIT = 0;
const TRANSLATION_X_TARGET = 0;
const TRANSLATION_Y_INIT = 0;
const TRANSLATION_Y_TARGET = 0;
const ROTATION_Z_INIT = 0;
const ROTATION_Z_TARGET = 0;
const OPACITY_INIT = 1;
const OPACITY_TARGET = 1;

function PlaygroundElement({style}: {style?: ViewStyle} = {}) {
  const baseStyle = {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.$backgroundGeneralHeavy,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5
  } as ViewStyle;  
  return <View style={[baseStyle, style]}/>;
}

function MotionComposeScreen({componentId}: {componentId: string}) {
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        background: {
          color: Colors.$backgroundGeneralHeavy
        }
      }
    });
  });

  const [animationSpecs, setAnimationSpecs] = useState<AnimationSpecs>({spring: Springs.gentle});
  const [isAnimated, setIsAnimated] = useState(false);

  const [scaleInit, setScaleInit] = useState(SCALE_INIT);
  const [scaleTarget, setScaleTarget] = useState(SCALE_TARGET);
  const scaleAnim = createScaleAnimation(scaleInit, scaleTarget);

  const [transXInit, setTransXInit] = useState(TRANSLATION_X_INIT);
  const [transXTarget, setTransXTarget] = useState(TRANSLATION_X_TARGET);
  const transXAnim = createTranslationXAnimation(transXInit, transXTarget);
  
  const [transYInit, setTransYInit] = useState(TRANSLATION_Y_INIT);
  const [transYTarget, setTransYTarget] = useState(TRANSLATION_Y_TARGET);
  const transYAnim = createTranslationYAnimation(transYInit, transYTarget);
  
  const [rotationZInit, setRotationZInit] = useState(ROTATION_Z_INIT);
  const [rotationZTarget, setRotationZTarget] = useState(ROTATION_Z_TARGET);
  const rotationZAnim = createRotationZAnimation(rotationZInit, rotationZTarget);

  const [opacityInit, setOpacityInit] = useState(OPACITY_INIT);
  const [opacityTarget, setOpacityTarget] = useState(OPACITY_TARGET);
  const opacityAnim = createOpacityAnimation(opacityInit, opacityTarget);
  
  const [previewStyle, setPreviewStyle] = useState<ViewStyle | null>(null);
  const setPreviewStyleInitial = () => setPreviewStyle({
    transform: [
      {scale: scaleInit},
      {translateX: transXInit},
      {translateY: transYInit},
      {rotate: `${rotationZInit}deg`}
    ],
    opacity: opacityInit
  } as ViewStyle);
  const setPreviewStyleTarget = () => setPreviewStyle({
    transform: [
      {scale: scaleTarget},
      {translateX: transXTarget},
      {translateY: transYTarget},
      {rotate: `${rotationZTarget}deg`}
    ],
    opacity: opacityTarget
  } as ViewStyle);
  const clearPreviewStyle = () => setPreviewStyle(null);

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View flex useSafeArea>
        <Text text80 marginB-s3>
          Tap the box to animate it
        </Text>

        <View center>
          <TouchableWithoutFeedback onPress={() => setIsAnimated(!isAnimated)} >
            <View
              marginB-s6
              padding-s32
              style={{
                borderWidth: 1,
                borderColor: Colors.$outlineDefault,
                borderRadius: 8,
                borderStyle: 'dashed',
                backgroundColor: Colors.$backgroundNeutralLight,
                alignItems: 'center',
                justifyContent: 'center',
                height: 250,
                width: 250,
                overflow: (previewStyle !== null ? 'visible' : 'hidden')
              }}
            >
              {previewStyle !== null ? (
                <PlaygroundElement style={previewStyle}/>
              ) : (
                <AnimationStack
                  animations={[scaleAnim, transXAnim, transYAnim, rotationZAnim, opacityAnim]}
                  animationSpecs={animationSpecs}
                  isAnimated={isAnimated}
                >
                  <PlaygroundElement/>
                </AnimationStack>
              )}
            </View>
          </TouchableWithoutFeedback>  
        </View>
        

        <ScaleConfigurationPanel
          initialValue={SCALE_INIT}
          targetValue={SCALE_TARGET}
          
          onInitialPressIn={setPreviewStyleInitial}
          onInitialChange={(value) => {
            setScaleInit(value);
            setPreviewStyleInitial();
          }}
          onInitialPressOut={clearPreviewStyle}
          onTargetPressIn={setPreviewStyleTarget}
          onTargetChange={(value) => {
            setScaleTarget(value);
            setPreviewStyleTarget();
          }}
          onTargetPressOut={clearPreviewStyle}
        />

        <TranslationXConfigurationPanel
          initialValue={TRANSLATION_X_INIT}
          targetValue={TRANSLATION_X_TARGET}
          
          onInitialPressIn={setPreviewStyleInitial}
          onInitialChange={(value) => {
            setTransXInit(value);
            setPreviewStyleInitial();
          }}
          onInitialPressOut={clearPreviewStyle}
          onTargetPressIn={setPreviewStyleTarget}
          onTargetChange={(value) => {
            setTransXTarget(value);
            setPreviewStyleTarget();
          }}
          onTargetPressOut={clearPreviewStyle}
        />

        <TranslationYConfigurationPanel
          initialValue={TRANSLATION_Y_INIT}
          targetValue={TRANSLATION_Y_TARGET}
          
          onInitialPressIn={setPreviewStyleInitial}
          onInitialChange={(value) => {
            setTransYInit(value);
            setPreviewStyleInitial();
          }}
          onInitialPressOut={clearPreviewStyle}
          onTargetPressIn={setPreviewStyleTarget}
          onTargetChange={(value) => {
            setTransYTarget(value);
            setPreviewStyleTarget();
          }}
          onTargetPressOut={clearPreviewStyle}
        />

        <RotationZConfigurationPanel
          initialValue={ROTATION_Z_INIT}
          targetValue={ROTATION_Z_TARGET}
          
          onInitialPressIn={setPreviewStyleInitial}
          onInitialChange={(value) => {
            setRotationZInit(value);
            setPreviewStyleInitial();
          }}
          onInitialPressOut={clearPreviewStyle}
          onTargetPressIn={setPreviewStyleTarget}
          onTargetChange={(value) => {
            setRotationZTarget(value);
            setPreviewStyleTarget();
          }}
          onTargetPressOut={clearPreviewStyle}
        />

        <OpacityConfigurationPanel
          initialValue={OPACITY_INIT}
          targetValue={OPACITY_TARGET}
          
          onInitialPressIn={setPreviewStyleInitial}
          onInitialChange={(value) => {
            setOpacityInit(value);
            setPreviewStyleInitial();
          }}
          onInitialPressOut={clearPreviewStyle}
          onTargetPressIn={setPreviewStyleTarget}
          onTargetChange={(value) => {
            setOpacityTarget(value);
            setPreviewStyleTarget();
          }}
          onTargetPressOut={clearPreviewStyle}
        />

        <View marginT-s10>
          <AnimationConfigurationPanel onAnimationSelected={setAnimationSpecs}/>
        </View>
      </View>
    </ScrollView>
  );
}

export default MotionComposeScreen;
