import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles/styles';

export default function LoginScreen({ navigation, setIsLoggedIn }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState('');

  const handlePress = async () => {

    if (isLogin) {
      if (email === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    }
  
    const url = isLogin
      ? 'http://10.104.4.132:5000/login'
      : 'http://10.104.4.132:5000/register';
  
    const body = isLogin
      ? { username: email, password }
      : { username: email, password, 
        firstname: firstName, 
        lastname: lastName };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(body),
        
      });

      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("lastName", lastName);
      await AsyncStorage.setItem("email", email);
  
      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          if (result.token) {
            // Save token and update login state
            await AsyncStorage.setItem('token', result.token);
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {

      console.error('Error:', error);
      setMessage('Error connecting to the server.');

    }

  };
  
  return (

    <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
        
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handlePress}>{isLogin ? "Login" : "Sign Up"}</Pressable>
            <Pressable style={styles.button} onPress={() => setIsLogin(!isLogin)}>{isLogin ? "Switch to Sign Up" : "Switch to Login"}</Pressable>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

      </View>

    </SafeAreaView>
    
  );
}

