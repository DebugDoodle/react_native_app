import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';

const SecondScreen = ({ route }) => {
  const { firstName, lastName } = route.params;
  const radius = 80;
  const strokeWidth = 15;
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

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const data = Array.from({ length: 5 }, (_, index) => index);

  const renderCircle = ({ index }) => {
    const circleOffset = screenWidth * index; // Adjust the spacing as needed

    return (
      <Svg height="100%" width={screenWidth} key={index}>
        <G>
          <Circle
            cx={screenWidth / 2}
            cy="200"
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={screenWidth / 2}
            cy="200"
            r={radius+0.1}
            stroke="black"
            strokeWidth="15.4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </G>
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greetingMessage}</Text>
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
      <FlatList
        data={data}
        renderItem={renderCircle}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        inverted
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
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
});

export default SecondScreen;
