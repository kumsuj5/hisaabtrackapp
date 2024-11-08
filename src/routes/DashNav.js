import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BusinessPage from '../screens/BusinessPage';
import {createStackNavigator} from '@react-navigation/stack';
import About from '../screens/About';
import BusinessCreate from '../screens/BusinessCreate';
import ProductCreate from '../screens/ProductCreate';
import ProductPage from '../screens/ProductPage';
import ChatPage from '../screens/ChatPage';
import Colors from '../components/Colors';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreenk"
        component={HomeScreen}
        options={({ route }) => ({
          headerShown: true,
          title:  'Hisaab Track',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={({ route }) => ({
          headerShown: true,
          title: route?.params?.details?.name || 'User',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreenk"
        component={ProfileScreen}
        options={({ route }) => ({
          headerShown: true,
          title:  'Profile',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="BusinessPage"
        component={BusinessPage}
       options={({ route }) => ({
          headerShown: true,
          title:  'Profile',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="BusinessCreate"
        component={BusinessCreate}
       options={({ route }) => ({
          headerShown: true,
          title:  'Business create',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="ProductCreate"
        component={ProductCreate}
       options={({ route }) => ({
          headerShown: true,
          title:  'Product create',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="ProductPage"
        component={ProductPage}
       options={({ route }) => ({
          headerShown: true,
          title:  'Product page',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
      <Stack.Screen
        name="About"
        component={About}
       options={({ route }) => ({
          headerShown: true,
          title:  'About',  
          headerStyle: { backgroundColor: Colors.teal },    
          headerTintColor: '#fff',                        
          headerTitleStyle: { fontWeight: 'bold' },       
        })}
      />
    </Stack.Navigator>
  );
};

const DashNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'account';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Colors.teal,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default DashNav;
