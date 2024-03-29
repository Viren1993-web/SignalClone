import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Pressable, View, Text } from 'react-native'

const NewGroupButton = ({ onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <FontAwesome name="group" size={24} color="#4f4f4f" />
            </View>
            <Text style={{ marginLeft: 10, fontWeight:'bold', }}>New Group</Text>
        </Pressable>
    );
};

export default NewGroupButton;
