import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

const SecondScreen = () => {
  const percentage = 75;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage / 100,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,     
    }).start();
  }, [percentage, progress]);

  return (
    <View style={styles.container}>
      <Svg width={150} height={150}>
        <G rotation="-90" origin="75,75">
          <Circle
            cx="75"
            cy="75"
            r="70"
            fill="transparent"
            stroke="white"
            strokeWidth="10"
          />
          
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SecondScreen;
