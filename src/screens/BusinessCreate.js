import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import ButtonComponent from '../components/ButtonComponents';
import Colors from '../components/Colors';
import TextInputComponent from '../components/TextInputComponents';
import axios from '../components/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness, fetchBusinessSuccess } from '../redux/action/businessAction';

const BusinessCreate = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const [businessData, setBusinessData] = useState({
    name: '',
    gst_no: '',
    alternate_number: '',
    address: '',
    type: '',
    starting_capital: '',
  });

  // Handle input change
  const handleChange = (field, value) => {
    setBusinessData(prevState => ({ ...prevState, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Make the API request using axios
    axios(token).post(`/createBusiness`, businessData)
      .then(response => {
        console.log(response.data);
        Alert.alert('Success', 'Business created successfully!');
        setBusinessData({
          name: '',
          gst_no: '',
          alternate_number: '',
          address: '',
          type: '',
          starting_capital: '',
        });
        dispatch(fetchBusiness());
        // navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'Failed to create business.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Business</Text>

      {/* Input Fields */}
      <TextInputComponent
        placeholder="Business Name"
        value={businessData.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInputComponent
        placeholder="GST Number"
        value={businessData.gst_no}
        onChangeText={text => handleChange('gst_no', text)}
      />
      <TextInputComponent
        placeholder="Alternate Number"
        value={businessData.alternate_number}
        keyboardType="numeric"
        onChangeText={text => handleChange('alternate_number', text)}
        max={10}
      />
      <TextInputComponent
        placeholder="Address"
        value={businessData.address}
        onChangeText={text => handleChange('address', text)}
      />
      <TextInputComponent
        placeholder="Business Type (e.g. 1 or 2)"
        value={businessData.type}
        onChangeText={text => handleChange('type', text)}
      />
      <TextInputComponent
      
        placeholder="Starting Capital"
        value={businessData.starting_capital}
        keyboardType="numeric"
        onChangeText={text => handleChange('starting_capital', text)}
      />

      {/* Submit Button */}
      <ButtonComponent title="Create Business" onPress={handleSubmit} backgroundColor={Colors.teal}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default BusinessCreate;
