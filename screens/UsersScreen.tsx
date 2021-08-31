import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import UserItem from '../components/UserItem/UserItem';
import Users from '../assets/dummy-data/Users';

export default function UserScreen() {

  return (
    <View style={styles.page}>
      <FlatList
        data={Users}
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