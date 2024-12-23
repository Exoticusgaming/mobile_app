import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './Components/LoginScreen';
import WelcomeScreen from './Components/WelcomeScreen';
import ProfileScreen from './Components/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {

        const checkLoginStatus = async () => {

            try {
                const token = await AsyncStorage.getItem('token');
                setIsLoggedIn(!!token);
              } catch (error) {
                console.error('Error fetching token:', error);
                setIsLoggedIn(false);
              }
            };
        
            checkLoginStatus();
          }, []);
        
          if (isLoggedIn === null) {
            // Optional: Show a loading indicator while checking login status
            return null;
          }
        
          return (
            <NavigationContainer>
            <Stack.Navigator>
              {isLoggedIn ? (
                // If logged in, show the Welcome screen
                <>
                  <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                    {props => <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                  </Stack.Screen>
                  <Stack.Screen name="Profile" options={{ headerShown: false }}>
                    {props => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                  </Stack.Screen>
      
                </>
              ) : (
                // Not logged in, show the Login screen
                <Stack.Screen name="Login" options={{ headerShown: false }}>
                  {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          </NavigationContainer>
      
          );
        }
        