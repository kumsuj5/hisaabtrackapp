import React, { useState } from 'react';
import { View, Text, Alert, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponents';
import Colors from '../components/Colors';
import TextInputComponent from '../components/TextInputComponents';
import axios from '../components/axios';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob'; // Import rn-fetch-blob

const ProductCreate = ({ navigation, route }) => {
  const token = useSelector((state) => state.auth.user.token);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    business_id: route.params.id,
    image_path: null,
    quantity: '',
    type: '',
  });

  // Handle input change
  const handleChange = (field, value) => {
    setProductData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setProductData({ ...productData, image_path: source });
      }
    });
  };

  const handleSubmit = () => {
    if (productData.image_path) {
      console.log(productData.image_path)
      // Create form data with RNFetchBlob for file upload
      RNFetchBlob.fetch(
        'POST',
        `http://10.0.2.2:8000/api/createProduct`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image_path',
            filename: productData.image_path.name,
            type: productData.image_path.type,
            data: RNFetchBlob.wrap(productData.image_path.uri.replace('file://', '')),
          },
          { name: 'name', data: productData.name },
          { name: 'price', data: productData.price },
          { name: 'quantity', data: productData.quantity },
          { name: 'type', data: productData.type },
          { name: 'business_id', data: `${productData.business_id}` },
        ],
      )
        .then((response) => {
          console.log(response.data);
          Alert.alert('Success', 'Product created successfully!');
          setProductData({
            name: '',
            price: '',
            business_id: route.params.id,
            image_path: null,
            quantity: '',
            type: '',
          });
          navigation.goBack();
        })
        .catch((error) => {
          console.log('Error:', error.response.data);  // Log the error response for better insights
          Alert.alert('Error', 'Failed to create PRODUCT.');
        });
    } else {
      Alert.alert('Error', 'Please select an image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Product</Text>

      {/* Input Fields */}
      <TextInputComponent
        placeholder="Product Name"
        value={productData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInputComponent
        placeholder="Price"
        value={productData.price}
        keyboardType="numeric"
        onChangeText={(text) => handleChange('price', text)}
      />
      <TextInputComponent
        placeholder="Quantity"
        value={productData.quantity}
        keyboardType="numeric"
        onChangeText={(text) => handleChange('quantity', text)}
      />
      <TextInputComponent
        placeholder="Type (e.g. 1 or 2)"
        value={productData.type}
        onChangeText={(text) => handleChange('type', text)}
      />
      <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <ButtonComponent title="Pick an Image" onPress={handleImagePicker} backgroundColor={Colors.silver} />
      </View>
      {productData.image_path && (
        <Image source={{ uri: productData.image_path.uri }} style={styles.image} />
      )}

      <ButtonComponent title="Create Product" onPress={handleSubmit} backgroundColor={Colors.teal} />
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
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default ProductCreate;
