import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from '../src/models';


export default function TabOneScreen() {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(ChatRoomUser => ChatRoomUser.user.id === userData.attributes.sub)
        .map(ChatRoomUser=>ChatRoomUser.chatroom);
      setChatRooms(chatRooms);
      console.log(chatRooms);
    }
    fetchChatRooms();
  }, []);
  const logout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Pressable onPress={logout}

      ><Text>Logout</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  }
});