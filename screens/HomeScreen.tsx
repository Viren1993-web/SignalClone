import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';
import { Auth } from 'aws-amplify';
export default function TabOneScreen() {
  const logout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRoomsData}
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