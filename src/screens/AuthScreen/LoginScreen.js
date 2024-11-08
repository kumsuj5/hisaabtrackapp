import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Auth from '../../redux/action/authAction'
import TextInputComponent from '../../components/TextInputComponents';
import Colors from '../../components/Colors';
import ButtonComponent from '../../components/ButtonComponents';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Corrected the function name to 'login'
  const handleLogin = () => {
    dispatch(Auth.login(email, password));  
    
  };

  return (
    <View style={{ padding: 20 ,flex:1,backgroundColor:Colors.white}}>
      <Text style={{fontSize:30, fontWeight:'600',alignSelf:'center',justifyContent:'center',margin:20}}>Login</Text>
      <TextInputComponent 
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInputComponent
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <ButtonComponent backgroundColor={Colors.teal} title="Login" onPress={handleLogin} />
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <Text style={{alignSelf:'center', color:'black',marginRight:5}}>Don't have an account?</Text>
      <Text onPress={()=> navigation.navigate('SignUpScreen')} style={{alignSelf:'center', color:Colors.teal}}>Create one</Text>

      </View>
    </View>
  );
};

export default LoginScreen;
