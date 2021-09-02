import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicatorBase } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { DataStore } from '@aws-amplify/datastore';
import { User, ChatRoomUser,Message } from '../../src/models';
import { Auth } from 'aws-amplify';

export default function ChatRoomItem({ chatRoom }) {
    //const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [lastMessage,setLastMessage]=useState<Message|undefined>(undefined);

    const navigation = useNavigation();
    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
                .filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id)
                .map(chatRoomUser => chatRoomUser.user);
            //setUsers(fetchedUsers);
            console.log(fetchedUsers);
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);

        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if(!chatRoom.chatRoomLastMessageId)
        return;
        DataStore.query(Message,chatRoom.chatLastMessageId).then(setLastMessage);
    }, []);

    const onPress = () => {
        navigation.navigate('ChatRoom', { id: chatRoom.id });
    }
    if (!user) {
        return <ActivityIndicatorBase />
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{ uri: user.imageUrl }}
                style={styles.image} />

            {!!chatRoom.newMessages ? <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View> : null}
            {/* {chatRoom.newMessages&&<View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View>} */}

            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>{lastMessage.createdAt}</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>{lastMessage.content}</Text>
            </View>
        </Pressable>
    );
}

