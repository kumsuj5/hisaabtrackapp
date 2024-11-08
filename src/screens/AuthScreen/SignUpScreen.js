// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
// import * as Auth from '../../redux/action/authAction'
// import TextInputComponent from '../../components/TextInputComponents';
// import Colors from '../../components/Colors';
// import ButtonComponent from '../../components/ButtonComponents';

// const SignUpScreen = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confpassword, setConfPassword] = useState('');
//   const dispatch = useDispatch();

//   // Corrected the function name to 'login'
//   const handleRegister = () => {
//     if(email && name && password ){

//       if(password == confpassword){
//         dispatch(Auth.register(name,email, password,confpassword));
//       }else{
//         Alert.alert("please math the password")
//       }
//     }else{
//       Alert.alert("Please fill the all required field")
//     }

//   };

//   return (
//     <View style={{ padding: 20 ,flex:1,backgroundColor:Colors.white}}>
//       <Text style={{fontSize:30, fontWeight:'600',alignSelf:'center',justifyContent:'center',margin:20}}>Create an account</Text>
//       <TextInputComponent
//         value={name}
//         onChangeText={setName}
//         placeholder="name"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <TextInputComponent
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <TextInputComponent
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <TextInputComponent
//         value={confpassword}
//         onChangeText={setConfPassword}
//         placeholder="Confirem Password"
//         secureTextEntry
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />
//       <ButtonComponent backgroundColor={Colors.teal} title="Signup" onPress={handleRegister} />
//       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
//       <Text style={{alignSelf:'center', color:'black',marginRight:5}}>Already have an account?</Text>
//       <Text onPress={()=> navigation.navigate('LoginScreen')} style={{alignSelf:'center', color:Colors.teal}}>Login</Text>

//       </View>
//     </View>
//   );
// };

// export default SignUpScreen;

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Auth from '../../redux/action/authAction';
import TextInputComponent from '../../components/TextInputComponents';
import Colors from '../../components/Colors';
import ButtonComponent from '../../components/ButtonComponents';
import {launchImageLibrary} from 'react-native-image-picker';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilepath, setProfilepath] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const dispatch = useDispatch();

const handleImagePicker = () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, response => {
    console.log('ImagePicker Response: ', response); // Debug log
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const source = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName || 'photo.jpg',
      };
      setProfilepath(source.uri);
      console.log(source.uri, 'image');
    } else {
      console.log('No image selected');
    }
  });
};


  const handleRegister = () => {
    console.log(profilepath)
    if (name && email && password ) {
      if (password === confpassword) {
        dispatch(
          Auth.register(name, email, password, confpassword, profilepath),
        );
      } else {
        Alert.alert('Passwords do not match');
      }
    } else {
      Alert.alert('Please fill all required fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <ButtonComponent
        title="Pick an Image"
        onPress={handleImagePicker}
        backgroundColor={Colors.silver}
      />
      {profilepath ? (
        <Image source={{uri: profilepath}} style={styles.image} />
      ) : null}

      <TextInputComponent
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInputComponent
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInputComponent
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TextInputComponent
        value={confpassword}
        onChangeText={setConfPassword}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />
      <ButtonComponent
        backgroundColor={Colors.teal}
        title="Signup"
        onPress={handleRegister}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.footerLink}>
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    alignSelf: 'center',
    margin: 20,
  },
 
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: 'black',
    marginRight: 5,
  },
  footerLink: {
    color: Colors.teal,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default SignUpScreen;
