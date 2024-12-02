import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BMIScreen from '../screens/BMIScreen';
import WeeklyChart from '../components/WeeklyChart';
import { Ionicons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

const MainNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Dashboard') {
                    iconName = 'home';
                } else if (route.name === 'AddWorkout') {
                    iconName = 'add-circle';
                } else if (route.name === 'Profile') {
                    iconName = 'person';
                } else if (route.name === 'WeeklyChart') {  
                    iconName = 'bar-chart';  
                } else if (route.name === 'BMI') {  
                    iconName = 'body-outline';  
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
    >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="WeeklyChart" component={WeeklyChart} />
        <Tab.Screen name="BMI" component={BMIScreen} />
        <Tab.Screen name="AddWorkout" component={AddWorkoutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

export default MainNavigator;
