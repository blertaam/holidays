import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { holiday } = route.params; // Get holiday details from params

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{holiday.name}</Text>
      <Text style={styles.holidayDate}>Date: {holiday.date}</Text>
      <Text style={styles.detailsText}>More details about {holiday.name}...</Text>
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Holiday Details:</Text>
        <Text style={styles.detailsDescription}>Here you can add specific information about {holiday.name}.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ff6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  holidayDate: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  detailsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginTop: 10,
  },
  detailsCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
});

export default DetailsScreen;
