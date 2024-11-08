import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleText = ({ text, textStyle, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default SimpleText;
