import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite coin yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

export default EmptyState;
