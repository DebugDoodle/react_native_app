import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, BackHandler, Animated, Easing } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const SecondScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backHandler = () => {
      // Disable the back button if this screen is focused
      if (isFocused) {
        return true; // Returning true prevents the default back action
      }
      return false; // Returning false allows the default back action
    };

    // Add the event listener for the hardware back button
    const backHandlerListener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });

    // Add the event listener for the software back button (Android)
    const hardwareBackListener = BackHandler.addEventListener('hardwareBackPress', backHandler);

    // Start the fade-in animation when the screen is focused
    if (isFocused) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }

    // Clean up the listeners when the component unmounts or loses focus
    return () => {
      backHandlerListener();
      hardwareBackListener.remove();
    };
  }, [isFocused, navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: opacity }]}>
        This is the Second Screen
      </Animated.Text>
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
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default SecondScreen;
