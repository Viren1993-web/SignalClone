import { DataStore, Auth } from 'aws-amplify';
import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { generateKeyPair, encrypt, decrypt } from '../utils/crypto';

const Settings = () => {

    const logOut = async () => {
        await DataStore.clear();
        Auth.signOut();
    };

    const updateKeyPair = async () => {
        //generate private and public key
        const { publicKey, secretKey } = generateKeyPair();
        console.log(publicKey, secretKey);

        //save private key to Async storage

        //save public key to UserModal in Datastore
    };

    return (
        <View>
            <Text>Setting</Text>
            <Pressable
                onPress={updateKeyPair}
                style={{
                    backgroundColor: "white",
                    height: 50,
                    margin: 10,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Update KeyPair</Text>
            </Pressable>
            <Pressable
                onPress={logOut}
                style={{
                    backgroundColor: "white",
                    height: 50,
                    margin: 10,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
};

export default Settings;
