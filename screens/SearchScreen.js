import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'd9d2d1b6-661f-4ae9-a8a9-e845a4da60fa';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch holidays once on load
    fetch(`https://holidayapi.com/v1/holidays?pretty&country=US&year=2024&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setHolidays(data.holidays || []);
      })
      .catch(() => alert('Failed to fetch holidays'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() !== '') {
      // Filter holidays based on the search text (case-insensitive)
      const filtered = holidays.filter((holiday) =>
        holiday.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHolidays(filtered);
    } else {
      // If the search text is empty, show nothing (initial empty state)
      setFilteredHolidays([]);
    }
  };

  const handleKeyPress = (e) => {
    // When the user presses "Enter" on the keyboard, trigger the search
    if (e.nativeEvent.key === 'Enter') {
      handleSearch(search); // This will trigger the filtering
    }
  };

  const handleHolidayPress = (holiday) => {
    // Ensure navigation to 'Details' screen is working
    navigation.navigate('Details', { holiday });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#007AFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search holidays..."
          value={search}
          onChangeText={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredHolidays}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.holidayItem}
              onPress={() => handleHolidayPress(item)} // Navigate to details screen
            >
              <Text style={styles.holidayName}>{item.name}</Text>
              <Text style={styles.holidayDate}>{item.date}</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchBar: {
    height: 40,
    width: '90%',
    fontSize: 16,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
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

export default SearchScreen;
