import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import { Ionicons } from 'react-native-vector-icons';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import CountrySelectorScreen from './screens/CountrySelectorScreen';
import SearchScreen from './screens/SearchScreen';
import CalendarScreen from './screens/CalendarScreen';
import DetailsScreen from './screens/DetailsScreen'; // Import DetailsScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator

// Stack Navigator for HomeScreen and DetailsScreen
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }} // Set only "Home" as the header title
      />

      {/* Details Screen */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }) => ({
          title: 'Holiday Details', // Title for DetailsScreen
          headerBackTitleVisible: false, // Remove default back button label
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()} // Navigate back to HomeScreen
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        {/* Home Tab with Stack Navigator */}
        <Tab.Screen
          name="Home"
          component={HomeStack} // Using the stack navigator for the Home screen and details
          options={{
            tabBarLabel: 'Home', // Label shown in the tab
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false, // Prevent duplicate "Home" header in Bottom Tab Navigator
          }}
        />

        {/* Country Selector Tab */}
        <Tab.Screen
          name="CountrySelector"
          component={CountrySelectorScreen}
          options={{
            tabBarLabel: 'Countries',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="globe" color={color} size={size} />
            ),
          }}
        />

        {/* Search Tab */}
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />

        {/* Calendar Tab */}
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
