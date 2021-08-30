import React from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import Message from '../components/Message/Message';
import ChatRoomData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput/MessageInput';
import { useRoute, useNavigation } from '@react-navigation/core';
export default function ChatRoomScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    console.warn("Display:", route.params?.id);
    navigation.setOptions({ title: 'Viren' });
    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={ChatRoomData.messages}
                renderItem={({ item }) => <Message message={item} />}
                inverted
            />
            <MessageInput />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
});

