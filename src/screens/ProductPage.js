import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Touchable, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness } from '../redux/action/businessAction'; // Import the action creator
import ButtonComponent from '../components/ButtonComponents';
import Colors from '../components/Colors';
import axios from '../components/axios';
import { ip } from '../components/IpAddress';


const ProductPage = ({navigation,route}) => {
  console.log(route)
  const dispatch = useDispatch();
  const [data,setData]= useState([])
  const token = useSelector((state) => state.auth.user.token);

  const fetchData = ()=>{
    axios(token).get(`showProduct?business_id=${route.params.id}`).then((resp)=>{
      console.log(resp.data.data)
      setData(resp.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
    // console.log(business,"ye bus")
  useEffect(() => {
    fetchData()
    dispatch(fetchBusiness());
  }, [dispatch]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    });
    return unsubscribe;
}, [navigation])
  // Render a single business item
  const renderBusiness = ({ item }) => (
    <TouchableOpacity 
    // onPress={()=>navigation.navigate('ProductPage',{id:item.id})} 
    style={styles.businessItem}>
      <View style={{flexDirection:'row'}}>

      <View>
      {item.image_path ? 
        <Image alt='hello'
        source={{ uri: `${ip}/storage/${item.image_path}` }}
        // source={{ uri: item.image_path }}
          style={styles.productImage}
        />
        :
        <Image source={require('../assets/icons/no-image-icon-23485.png')}  style={styles.productImage}/>
      }
      </View>
      <View style={{padding:8}}>
      <Text style={styles.businessName}>Product name : {item.name}</Text>
      <Text style={styles.businessDetails}>Price: {item.price}</Text>
      <Text style={styles.businessDetails}>Quantity: {item.quantity}</Text>
      </View>
      </View>
      
    </TouchableOpacity>
  );

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBusiness}
        contentContainerStyle={styles.listContent}
      />
       <ButtonComponent backgroundColor={Colors.teal} title="Create Peroduct" onPress={()=>navigation.navigate('ProductCreate',{id:route.params.id})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    // textAlign: 'center',
    color: '#333',
  },
  businessItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  
  },
  businessName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  businessDetails: {
    fontSize: 14,
    color: '#666',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  listContent: {
    paddingBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default ProductPage;
