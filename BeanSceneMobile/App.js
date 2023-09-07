import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from "./src/screens/Login";
import Items from "./src/screens/Items";
import Search from './src/screens/Search';
import ManagerDashboard from './src/screens/ManagerDashboard';
import StaffDashboard from './src/screens/StaffDashboard';
import Reports from './src/screens/Reports'

import global from './src/utils/global';
import { State } from 'react-native-gesture-handler';
import Orders from './src/screens/Orders';

const HomeStack = createStackNavigator();

const BottomTabStack = createBottomTabNavigator();



export default function App() {
  /* #region */
  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch('http://localhost:19006/', {mode:'cors'});
  //     const data = await response.json();
  //     console.log({ data })
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }
  // useEffect(() => {
  //   makeAPICall();
  // }, [])
  /* #endregion */
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <HomeStack.Screen name="ManagerDashboard" options={{ headerShown: false }} component={ManagerDashboardTab} />
        <HomeStack.Screen name="StaffDashboard" options={{ headerShown: false }} component={StaffDashboardTab} />

      </HomeStack.Navigator>
    </NavigationContainer>

  );
}

function ManagerDashboardTab() {
  return (
    <BottomTabStack.Navigator screenOptions={screenOptionStyle}>
      <BottomTabStack.Screen name="Items" component={Items} />
      <BottomTabStack.Screen name="Staff" component={ManagerDashboard} />
      <BottomTabStack.Screen name="Orders" component={Orders} />
      <BottomTabStack.Screen name="Reports" component={Reports} />
      <BottomTabStack.Screen name="Search" component={Search} />
    </BottomTabStack.Navigator>
  )
}

function StaffDashboardTab() {
  return (
    <BottomTabStack.Navigator screenOptions={screenOptionStyle}>
      <BottomTabStack.Screen name="Items" component={Items} />
      <BottomTabStack.Screen name="Orders" component={Orders} />
      <BottomTabStack.Screen name="Search" component={Search} />
    </BottomTabStack.Navigator>
  )
}
const screenOptionStyle = {

  headerStyle: {
    backgroundColor: '#FF7F50',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  headerRight: () => (
    <Text style={{ color: 'white', paddingRight: 15, fontSize: 20, fontWeight: 'bold', fontFamily: 'book-antiqua' }}>BeanScene</Text>
  ),
  tabBarStyle: [{ backgroundColor: '#606060', fontSize: 18, color: 'white', fontweight: 'bold' }],
  tabBarLabelStyle: [{ fontSize: 16 }],
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: '#101010'

}