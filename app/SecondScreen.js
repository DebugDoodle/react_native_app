import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

const SecondScreen = ({ route }) => {
  const { firstName, lastName } = route.params;
  const radius = 17;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const percentage = 20;
  const progress = circumference - (percentage / 100) * circumference;

  const currentHours = new Date().getHours();
  let greetingMessage;

  if (currentHours >= 5 && currentHours < 12) {
    greetingMessage = 'Good morning';
  } else if (currentHours >= 12 && currentHours < 18) {
    greetingMessage = 'Good afternoon';
  } else {
    greetingMessage = 'Good evening';
  }

  const renderCircles = () => {
    const numberOfCircles = 5;
    const circles = [];

    for (let i = 0; i < numberOfCircles; i++) {
      circles.push(
        <Svg key={i} height="100%" width="100%" viewBox="0 0 120 120">
          <G rotation={"270"}>
            <Circle
              cx="-54"
              cy="36"
              r="17"
              stroke="white"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Text style={styles.percentageText}>{percentage}%</Text>
            <Circle
              cx="-54"
              cy="36"
              r="18"
              stroke="black"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
            />
          </G>
        </Svg>
      );
    }
    return circles;
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greetingMessage}</Text>
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.horizontalContainer}>{renderCircles()}</View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  greetingText: {
    fontSize: 24,
    color: 'white',
    marginTop: 100,
    marginRight: 'auto',
    marginLeft: 20,
    opacity: 0.65,
  },
  percentageText: {
    marginTop: 250,
    marginLeft: 140,
    position: 'absolute',
    fontSize: 50,
    color: 'white',
  },
  name: {
    fontSize: 50,
    color: 'white',
    marginTop: 0,
    marginRight: 'auto',
    marginLeft: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
});

export default SecondScreen;
