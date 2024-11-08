import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextComponent = ({ text, textStyle, containerStyle, numberOfLines = 1, ellipsizeMode = 'tail' }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={[styles.text, textStyle]}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default TextComponent;
