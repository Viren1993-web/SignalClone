import React, { useEffect, useState } from "react";
import { View, Image, Text, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import moment from "moment";
import ChatRooms from "../assets/dummy-data/ChatRooms";
const ChatRoomHeader = ({ id, children }) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined);
  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };
  const fetchChatRoom = async () => {
    DataStore.query(ChatRoom, id).then(setChatRoom);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchUsers();
    fetchChatRoom();
  }, []);

  const getLastOnlineText = () => {
    //if last online less than 1 minutes ago, show him as ONLINE
    const lastOnlineDiffMS = moment().diff(moment(user?.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      //less than 1 minute
      return 'online'
    }
    else {
      return `Last seen ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };
  const getUsernames = () => {
    return allUsers.map(user => user.name).join(',');
  }

  const isGroup = allUsers.length > 2;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 70,
        marginLeft: 1,
        padding: 5,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: chatRoom?.imageUri || user?.imageUri,
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={{ fontWeight: "bold" }}>
          {chatRoom?.name || user?.name}
        </Text>
        <Text numberOfLines={1}>
          {isGroup ? getUsernames() : getLastOnlineText()}
        </Text>
      </View>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default ChatRoomHeader;