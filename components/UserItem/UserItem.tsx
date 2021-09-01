import React from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';

export default function UserItem({ user }) {

    const navigation = useNavigation();
    const onPress = async () => {
        //TODO if there is already a chat room between these 2 users
        //then redirect to the existing chat room
        //authorize, create a new chatroom with these users.
        //create chatroom
        const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));
        //connect authenticated user with the room
        const authUser = await Auth.currentAuthenticatedUser();
        console.log(authUser);
        const dbUser = await DataStore.query(User, authUser.attributes.sub);
        console.log(dbUser);
        await DataStore.save(new ChatRoomUser({
            user: dbUser,
            chatroom: newChatRoom
        }))

        //connect clicked user with the room


        await DataStore.save(new ChatRoomUser({
            user,
            chatroom: newChatRoom
        }))

        navigation.navigate('ChatRoom', { id: chatRoom.id });
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{ uri: user.imageUrl }} style={styles.image} />
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </View>
        </Pressable>
    );
}

