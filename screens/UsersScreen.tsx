import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import UserItem from '../components/UserItem/UserItem';
//import Users from '../assets/dummy-data/Users';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
export default function UserScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    DataStore.query(User).then(setUsers);

  }, []);
  console.log(users);
  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  }
});