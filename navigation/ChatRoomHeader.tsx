import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoomUser, User } from "../src/models";

const ChatRoomHeader = ({ id, children }) => {
    const { width } = useWindowDimensions();
    const [user, setUser] = useState<User | null>(null);
    console.log(id);

    useEffect(() => {
        if (!id) {
            return;
        }
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

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width - 90,
            marginLeft: 25,
            padding: 10,
            alignItems: 'center',
        }}>
            <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 30, height: 30, borderRadius: 30, marginRight: 25 }}
            />
            <Text style={{ flex: 1, marginLeft: 10, fontWeight: 'bold' }}>{user?.name}</Text>
            <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
            <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </View>
    );
};

export default ChatRoomHeader;