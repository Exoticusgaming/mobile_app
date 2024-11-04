import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, Text, View, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({navigation}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [updatedFirstName, updateFirstName] = useState('');
    const [updatedLastName, updateLastName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

        getStorage()

    }, [])

    async function getStorage() {

        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        const storedEmail = await AsyncStorage.getItem("email");

        if (storedFirstName != null) {

            setFirstName(storedFirstName)

        }
        if (storedFirstName != null) {

            setLastName(storedLastName)

        }
        if (storedEmail != null) {

            setEmail(storedEmail)

        }

    };

    const handlePress = async () => {

        if (updatedFirstName != '')
        {

            setFirstName(updatedFirstName);
            await AsyncStorage.setItem('firstName', updatedFirstName);
            setMessage('Changes saved')

        }

        if (updatedLastName != '')
        {

            setLastName(updatedLastName);
            await AsyncStorage.setItem('lastName', updatedLastName)
            setMessage('Changes saved')

        }

        if (updatedFirstName == '' && updatedLastName == '') {

            setMessage('No changes were made')

        }

        return;

    };

    const navigateToWelcome = () => {

        navigation.navigate('Welcome');

    };

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.headerText}>Profile</Text>

            <View>
                <Image source={{uri:'https://www.worldanimalprotection.us/cdn-cgi/image/fit=cover,width=1376,format=auto/siteassets/images/wildlife/kangaroos/kangaroo-joey-getty.jpg'}} style={styles.profilePicture}/>
            </View>

            <Text style={styles.paragraph}>First Name: {firstName}</Text>
            <Text style={styles.paragraph}>Last Name: {lastName}</Text>
            <Text style={styles.paragraph}>Email: {email}</Text>

            <TextInput              
                style={styles.input}
                placeholder="Change first name"
                onChangeText={text => updateFirstName(text)}
                value={updatedFirstName}
            />
            <TextInput              
                style={styles.input}
                placeholder="Change last name"
                onChangeText={text => updateLastName(text)}
                value={updatedLastName}
            />

            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handlePress}>Save</Pressable>
                <Pressable style={styles.button} onPress={navigateToWelcome}>Back</Pressable>
            </View>

        </SafeAreaView>

    )
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
    paragraph: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        color: "black",
    },
    input: {
        height: 40,
        width:'55%',
        borderColor: 'black',
        backgroundColor: '#D3D3D3',
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 12,
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
    message: {
        marginTop: 20,
        color: 'red',
        textAlign: 'center',
      },

});

