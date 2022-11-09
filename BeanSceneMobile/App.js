import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

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

const HomeStack = createStackNavigator();

const BottomTabStack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Login" options={{headerShown:false}} component={Login} />
        <HomeStack.Screen name="ManagerDashboard" options={{headerShown:false}} component={ManagerDashboardTab} />
        <HomeStack.Screen name="StaffDashboard" options={{headerShown:false}} component={StaffDashboardTab} />

      </HomeStack.Navigator>
    </NavigationContainer>

  );
}

function ManagerDashboardTab() {
  return (
    <BottomTabStack.Navigator screenOptions={screenOptionStyle}>
      <BottomTabStack.Screen name="Items" component={Items}  />
      <BottomTabStack.Screen name="Staff" component={ManagerDashboard} />
      <BottomTabStack.Screen name="Reports" component={Reports} />
      <BottomTabStack.Screen name="Search" component={Search} />
    </BottomTabStack.Navigator>
  )
}

function StaffDashboardTab() {
  return (
    <BottomTabStack.Navigator screenOptions={screenOptionStyle}>
      <BottomTabStack.Screen name="Items" component={Items}  />
      <BottomTabStack.Screen name="Staff" component={StaffDashboard} />
      <BottomTabStack.Screen name="Reports" component={Reports} />
      <BottomTabStack.Screen name="Search" component={Search} />
    </BottomTabStack.Navigator>
  )
}
const screenOptionStyle = {

  headerStyle: {
    backgroundColor: '#e74c3c',
  },
  headerTitleStyle:{
    color:'white',
    fontWeight:'bold',
    fontSize:20
  },
  headerRight:()=>(
    <Text style={{color:'white',paddingRight:15,fontSize:20,fontWeight:'bold'}}>Gelos ISS</Text>
  ),
  tabBarStyle:[{backgroundColor:'#e74c3c',fontSize:18,color:'white',fontweight:'bold'}],
  tabBarLabelStyle:[{fontSize:16}],
  tabBarActiveTintColor:'white',
  tabBarInactiveTintColor:'black'

}