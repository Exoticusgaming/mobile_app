import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, Text, Pressable, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    getStorage()

  }, [])

  async function getStorage() {

      const storedFirstName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");
      const storedEmail = await AsyncStorage.getItem("email");

      if (storedEmail != null) {

          setEmail(storedEmail)

      }

  }

  const handleLogout = async () => {

    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],

    });

  };

  const navigateToProfileScreen = () => {

    navigation.navigate('Profile');

  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.headerText}>Welcome, {email}!</Text>

      <View>
        <Image source={{uri:'https://www.worldanimalprotection.us/cdn-cgi/image/fit=cover,width=1376,format=auto/siteassets/images/wildlife/kangaroos/kangaroo-joey-getty.jpg'}} style={styles.profilePicture}/>
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={navigateToProfileScreen}>View Profile</Pressable>
        <Pressable style={styles.button} onPress={handleLogout}>Logout</Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    profilePicture: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      borderWidth: 5,
      borderRadius: 950,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: '#eeeeee',
      },
      headerText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
      },
      buttonContainer: {
        marginVertical: 10,
        alignSelf: 'center',
        width: '50%',
      },
      button: {
        borderColor: 'black',
        padding: 5,
        flex: 'center',
        borderWidth: 1,
        textAlign: "center",
        margin: 5,

    },

});
