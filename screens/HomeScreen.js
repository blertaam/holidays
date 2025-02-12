import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const API_KEY = 'd9d2d1b6-661f-4ae9-a8a9-e845a4da60fa';

const HomeScreen = ({ navigation }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://holidayapi.com/v1/holidays?pretty&country=US&year=2024&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setHolidays(data.holidays || []))
      .catch(() => alert('Failed to fetch holidays'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={holidays}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { holiday: item })}>
              <View style={styles.holidayItem}>
                <Text style={styles.holidayName}>{item.name}</Text>
                <Text style={styles.holidayDate}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  holidayItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  holidayName: {
    fontSize: 18,
    fontWeight: '500',
  },
  holidayDate: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
