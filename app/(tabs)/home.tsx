import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start',  
    alignItems: 'center',
    paddingTop: 80, 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
  },
});
