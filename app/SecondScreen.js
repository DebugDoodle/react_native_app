import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';



const SecondScreen = () => {
  const radius = 30; // smaller radius
  const strokeWidth = 8; // width of the progress bar
  const circumference = 2 * Math.PI * radius;
  const percentage = 25;
  const progress = circumference - (percentage / 100) * circumference;

  const currentHours = new Date().getHours();
  let greetingMessage;
  
  // Set the greeting based on the current time
  if (currentHours >= 5 && currentHours < 12) {
    greetingMessage = 'Good morning';
  } else if (currentHours >= 12 && currentHours < 18) {
    greetingMessage = 'Good afternoon';
  } else {
    greetingMessage = 'Good evening';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greetingMessage}</Text>
      <Svg height="100%" width="100%" viewBox="0 0 120 120">
        <G rotation={"270"} origin="60,60">
          {/* Background Circle */}
          <Circle
            cx="60"
            cy="60"
            r="30"
            stroke="white"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <Circle
            cx="60"
            cy="60"
            r="30"
            stroke="black"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
   greetingText: {
    fontSize: 24,
    color: 'white',
    
  },
  percentageText: {
    position: 'absolute',
    fontSize: 50,
    color: 'white',
  },
});

export default SecondScreen;
