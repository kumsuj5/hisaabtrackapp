import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import SInfo from 'react-native-sensitive-info';
import { logout } from '../redux/action/authAction';
import Colors from '../components/Colors';
import { ip } from '../components/IpAddress';


const ProfileScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  
  console.log(user,"ye user hai")
  const handleLogout = async () => {
    await SInfo.deleteItem('data', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    dispatch(logout());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {user?.profile_path ?
        <Image alt='hello'
        source={{ uri: `${ip}/storage/${user?.profile_path}` }}
          style={styles.productImage}
        />
        :
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.user_name?.[0]}</Text>
        </View>
        }
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.user_name}</Text>
          <Text style={styles.userName}>{user?.user_email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Icon name="create-outline" size={20} color="#fff" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity onPress={()=>navigation.navigate('BusinessPage')} style={styles.actionButton}>
        <Icon name="business-outline" size={24} color={Colors.teal} />
        <Text style={styles.actionButtonText}>Manage Business</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('About')} style={styles.actionButton}>
        <Icon name="information-circle-outline" size={24} color={Colors.teal} />
        <Text style={styles.actionButtonText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#f44336" />
        <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:10
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editProfileText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
  logoutText: {
    color: '#f44336',
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default ProfileScreen;
