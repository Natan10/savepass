import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const SIZE = 100;

export const Animation = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const pressed = useSharedValue(false);

  const startPos = 100;
  const x = useSharedValue(startPos);
  const y = useSharedValue(startPos);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{
  //       translateX: withSpring(rotation.value, {
  //         damping: 20,
  //         stiffness: 80
  //       })
  //     }]
  //   }
  // }); 

  const pressedEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
    }
  });

  const panEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(ctx.startX + event.translationX);
      y.value = withSpring(ctx.startY + event.translationY);
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [
        {
          scale: withSpring(pressed.value ? 1.2 : 1)
        }
      ]
    }
  })

  const pandAnimatedStyled = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [
        {
          translateX: x.value
        },
        {
          translateY: y.value
        }
      ]
    }
  })



  
  return(
    <View style={styles.container}>
      {/* <TapGestureHandler onGestureEvent={pressedEvent}> */}
      <PanGestureHandler onGestureEvent={panEvent}>
        <Animated.View style={[styles.circle, pandAnimatedStyled]}></Animated.View>
      </PanGestureHandler>
      {/* <Button title='move' onPress={() => (offset.value = Math.random())} />
      <Button title='start' onPress={() => {
        rotation.value = withSequence(
          withRepeat(withSpring(255),6, true)
        )
      }} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9'
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,256,0.5)'
  }
});
