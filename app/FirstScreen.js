import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';


const FirstScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [showSwipeText, setShowSwipeText] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const swipeTextOpacity = useRef(new Animated.Value(0)).current; // Added opacity value
  const swipeTextTranslateX = useRef(new Animated.Value(0)).current; // Added translation value for swipe text

  const snapPoints = ['', '2l', '4l', '6l', '8l', '10l'];

  const onSliderValueChange = (value) => {
    setSliderValue(value);

    setTimeout(() => {
      setShowSwipeText(true);

      Animated.timing(swipeTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(swipeTextTranslateX, {
        toValue: -80, // Adjust this value based on your requirement
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 500);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx < 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          // If the user swipes left by at least 50 units, animate the transition
          Animated.timing(translateX, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            setFirstName((prevFirstName) => {
              setLastName((prevLastName) => {
                navigation.navigate('SecondScreen', {
                  preload: true,
                  firstName: prevFirstName, // Use the previous values
                  lastName: prevLastName,
                });
              });
            });
          });
        } else {
          // If the swipe is not sufficient, reset the translation value
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  
  return (
<View
      style={styles.container}
      {...panResponder.panHandlers} // Attach panResponder to the main container
    >      
      <Animated.View style={[styles.screen, { transform: [{ translateX }] }]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput style={styles.input} onChangeText={(value) => setFirstName(value)} />
        </View>
        <View style={styles.inputContainerLastName}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput style={styles.input} onChangeText={(value) => setLastName(value)} />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.labelCenter}>Daily Goal</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={sliderValue}
            onValueChange={onSliderValueChange}
          />
          <View style={styles.snapPointsContainer}>
            {snapPoints.map((point, index) => (
              <View key={point} style={[styles.snapPoint, { left: (index / snapPoints.length) * 300 }]}>
                <Text style={styles.snapPointLabel}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      {showSwipeText && (
        <Animated.Text
          style={[
            styles.swipeText,
            { opacity: swipeTextOpacity, transform: [{ translateX: swipeTextTranslateX }] },
          ]}
        >
          Swipe left to continue
        </Animated.Text>
      )}
      <Animated.View
        style={[
          styles.blackRectangle,
          { width: Animated.add(300, Animated.multiply(translateX, -1)) }, // Adjust the width based on your design
        ]}
      />

      {/* Render the dragged name on the second screen */}
      <Animated.View
        style={[
          styles.draggedName,
          { transform: [{ translateX: Animated.add(translateX, -300) }] }, // Adjust the initial position based on your design
        ]}
      >
        <Text style={{ color: 'white' }}>Dragged Name</Text>
      </Animated.View>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'flex-start',
    marginTop: 0,
    marginLeft: 0,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 150,
  },
  inputContainerLastName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 10,
  },
  label: {
    fontSize: 30,
    marginRight: 8,
    marginLeft: 10,
  },
 
    input: {
    flex: 1,
    fontSize: 30,
    height: 50,
    width: 20,
  },
  sliderContainer: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center', // Center the components horizontally
  },
  labelCenter: {
    fontSize: 30,
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 40,
    marginTop: 10,
  },
 
  snapPointsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 15, // Adjust this value to position the snap points as needed
    left: 20,
  },
  snapPoint: {
    position: 'absolute',
    alignItems: 'center',
  },
  snapPointLabel: {
    fontSize: 13,
  },
  swipeText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  }, 
  blackRectangle: {
    position: 'absolute',
    top: 0,
    right: -270,
    bottom: 20,
    backgroundColor: 'black',
    borderBottomRightRadius:50,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    borderBottomLeftRadius:50,
    shadowOffset: {
      width: 50,
      height:4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    
  },
  draggedName: {
    position: 'absolute',
    top: 20, // Adjust the top position based on your design
    right: 20, // Adjust the right position based on your design
  },
});

export default FirstScreen;
