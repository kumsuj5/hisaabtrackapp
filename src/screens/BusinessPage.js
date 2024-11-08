import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness } from '../redux/action/businessAction'; // Import the action creator
import ButtonComponent from '../components/ButtonComponents';
import Colors from '../components/Colors';

const BusinessPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [data,setData]= useState([])
  // Get state from Redux store
  const { business, loading, error } = useSelector((state) => state.business);
    // console.log(business,"ye bus")
  useEffect(() => {
    dispatch(fetchBusiness());
  }, [dispatch,data]);

  // Render a single business item
  const renderBusiness = ({ item }) => (
    
    <TouchableOpacity onPress={()=>navigation.navigate('ProductPage',{id:item.id})} style={styles.businessItem}>
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>Starting Capital: {item.starting_capital}</Text>
      <Text style={styles.businessDetails}>Owner: {item.owner}</Text>
      <Text style={styles.businessDetails}>Address: {item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business List</Text>
      <FlatList
        data={business.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBusiness}
        contentContainerStyle={styles.listContent}
      />
       <ButtonComponent backgroundColor={Colors.teal} title="Create Business" onPress={()=>navigation.navigate('BusinessCreate')} />
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
    fontSize: 18,
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
});

export default BusinessPage;
