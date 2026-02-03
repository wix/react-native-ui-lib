import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, TouchableHighlight, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import Motion, {Builder, type MotionSpecs, Springs} from 'react-native-motion-lib';
import {Navigation} from 'react-native-navigation';
import {Colors, Text, View} from 'react-native-ui-lib';

import {InterpolationSelectDialog} from '../InterpolationSelectDialog';
import {type TokenizedInterpolationSpecs, getInterpolationGist} from '../InterpolationSelectPanel';
import {OpacityConfigurationPanel} from './OpacityConfigurationPanel';
import {RotationZConfigurationPanel} from './RotationZConfigurationPanel';
import {ScaleConfigurationPanel} from './ScaleConfigurationPanel';
import {TranslationXConfigurationPanel} from './TranslationXConfigurationPanel';
import {TranslationYConfigurationPanel} from './TranslationYConfigurationPanel';

const SCALE_INIT = 1;
const SCALE_TARGET = 1;
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
    alignItems: 'center'
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

  const [interpolation, setInterpolation] = useState<TokenizedInterpolationSpecs>({
    type: 'spring',
    spring: Springs.gentle,
    springTokenName: 'gentle'
  });
  const [triggerKey, setTriggerKey] = useState(0);
  const [isPressedIn, setIsPressedIn] = useState(false);
  const [scaleInit, setScaleInit] = useState(SCALE_INIT);
  const [scaleTarget, setScaleTarget] = useState(SCALE_TARGET);

  const [transXInit, setTransXInit] = useState(TRANSLATION_X_INIT);
  const [transXTarget, setTransXTarget] = useState(TRANSLATION_X_TARGET);

  const [transYInit, setTransYInit] = useState(TRANSLATION_Y_INIT);
  const [transYTarget, setTransYTarget] = useState(TRANSLATION_Y_TARGET);

  const [rotationZInit, setRotationZInit] = useState(ROTATION_Z_INIT);
  const [rotationZTarget, setRotationZTarget] = useState(ROTATION_Z_TARGET);

  const [opacityInit, setOpacityInit] = useState(OPACITY_INIT);
  const [opacityTarget, setOpacityTarget] = useState(OPACITY_TARGET);

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

  const initialStyle = useMemo(() => ({
    transform: [
      {scale: scaleInit},
      {translateX: transXInit},
      {translateY: transYInit},
      {rotate: `${rotationZInit}deg`}
    ],
    opacity: opacityInit
  } as ViewStyle), [scaleInit, transXInit, transYInit, rotationZInit, opacityInit]);

  const [dialogVisible, setDialogVisible] = useState(false);

  const motion: MotionSpecs = useMemo(() => {
    return new Builder(interpolation)
      .withScale(scaleInit, scaleTarget)
      .withTranslationX(transXInit, transXTarget)
      .withTranslationY(transYInit, transYTarget)
      .withRotationZ(rotationZInit, rotationZTarget)
      .withOpacity(opacityInit, opacityTarget)
      .build();
  }, [
    interpolation,
    scaleInit,
    scaleTarget,
    transXInit,
    transXTarget,
    transYInit,
    transYTarget,
    rotationZInit,
    rotationZTarget,
    opacityInit,
    opacityTarget
  ]);

  return (
    <View flex useSafeArea style={{padding: 20}}>
      <View center>
        <TouchableWithoutFeedback
          onPressIn={() => setIsPressedIn(true)}
          onPressOut={() => {
            setIsPressedIn(false);
            setTriggerKey((k) => k + 1);
          }}
        >
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
            ) : isPressedIn ? (
              <PlaygroundElement style={initialStyle}/>
            ) : (
              <Motion.View key={triggerKey} motion={motion}>
                <PlaygroundElement/>
              </Motion.View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator
      >
        <View row center flex>
          <Text text80>Interpolation: </Text>
          <TouchableHighlight
            marginT-s10
            underlayColor={Colors.$backgroundGeneralHeavy}
            onPress={() => setDialogVisible(true)}
          >
            <Text text80 color={Colors.$textPrimary}>{getInterpolationGist(interpolation)}</Text>
          </TouchableHighlight>
        </View>

        <View flex style={{opacity: (previewStyle !== null ? 0.2 : 1)}}>
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

        </View>
      </ScrollView>

      <InterpolationSelectDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        value={interpolation}
        onInterpolationSelected={setInterpolation}
      />
    </View>
  );
}

export default MotionComposeScreen;
