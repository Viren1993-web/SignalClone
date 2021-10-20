import React, { useState, useEffect } from "react";

import {
  Text,
  Image,
  Pressable,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";

export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
       /*  .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        ) */
        .map((chatRoomUser) => chatRoomUser.chatroom);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoom).subscribe((msg) => {
      //console.log(msg.model, msg.opType, msg.element);
      if (msg.model === ChatRoom && msg.opType === "INSERT") {
        setChatRooms((chatRooms) => [msg.element, ...chatRooms]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});