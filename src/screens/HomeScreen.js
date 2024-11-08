import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../components/axios';
import { useSelector } from 'react-redux';
import Colors from '../components/Colors';

const HomeScreen = ({navigation}) => {

  const token = useSelector((state) => state.auth.user?.token);

  // console.log(token,"this is token hello");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    try {
      // console.log(token)
      const response = await axios(token).get(`/allContact`);
      // console.log(response.data.data)
      setContacts(response.data.data); 
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Render a single contact item
  const renderContact = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate('ChatPage',{ details:item})} style={styles.contactItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.mobile}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="call-outline" size={24} color="#4CAF50" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.teal}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <StatusBar   animated={true}
        backgroundColor={Colors.teal}
/>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  contactNumber: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
    marginLeft: 'auto',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;