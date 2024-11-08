import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageComponent = ({ source, imageStyle, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image 
        source={source} 
        style={[styles.image, imageStyle]} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImageComponent;
