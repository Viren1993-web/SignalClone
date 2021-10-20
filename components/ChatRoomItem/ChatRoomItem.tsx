import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoomUser, User, Message, ChatRoom } from "../../src/models";
import styles from "./styles";
import Auth from "@aws-amplify/auth";
import moment from "moment";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function ChatRoomItem({chatRoom}) {
  // const [users, setUsers] = useState<User[]>([]); // all users in this chatroom
  const [user, setUser] = useState<User | null>(null); // the display user
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  //const [chatRoom,setChatRoom]=useState<ChatRoom>(props);
  const [isLoading, setIsLoading] = useState(true);
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatroom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);
      // setUsers(fetchedUsers);
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  const deleteChatItem = async () => {
    await DataStore.delete(chatRoom);
  }
  const confirmDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete the message ?", [
      {
        text: "Delete",
        onPress: deleteChatItem,
        style: "destructive",
      }, {
        text: "Cancel",
      },

    ])
  }

  const onActionPress = (index) => {
    if (index===0) {
      confirmDelete();
    } else {
      Alert.alert("Can't perform action", "This is not your Message");
    }

  }
  const openActionMenu = () => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions({
      options,
      destructiveButtonIndex,
      cancelButtonIndex
    }, onActionPress
    );
  };

  const time = moment(lastMessage?.createdAt).from(moment());

  return (
    <Pressable 
    onPress={onPress} 
    style={styles.container}
    onLongPress={openActionMenu}
    >
      <Image
        source={{ uri: chatRoom.imageUri || user.imageUri }}
        style={styles.image}
      />

      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{chatRoom.name || user.name}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}

