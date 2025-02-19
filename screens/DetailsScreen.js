import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { holiday } = route.params; // Get the holiday data passed from HomeScreen

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{holiday.name}</Text>
      <Text style={styles.details}>Date: {holiday.date}</Text>
      <Text style={styles.details}>Type: {holiday.type || "Not Available"}</Text>
      <Text style={styles.details}>Public: {holiday.public ? "Yes" : "No"}</Text>
      <Text style={styles.details}>Location: {holiday.location || "Not Available"}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailsScreen;
