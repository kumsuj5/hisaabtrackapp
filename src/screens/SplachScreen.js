
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplachScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
       source={require('../assets/icons/splash_screen_news_avd_preview.gif')}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplachScreen;
