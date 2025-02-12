import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet, FlatList, ImageBackground } from 'react-native';

const CountrySelectorScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = (country) => {
    fetch(`https://holidayapi.com/v1/holidays?pretty&country=${country}&year=2024&key=d9d2d1b6-661f-4ae9-a8a9-e845a4da60fa`)
      .then((response) => response.json())
      .then((data) => setHolidays(data.holidays || []))
      .catch(() => alert('Failed to fetch holidays'));
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    fetchHolidays(country);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Winkel_triple_projection_SW.jpg/1920px-Winkel_triple_projection_SW.jpg' }} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Select a Country</Text>
        <Picker
          selectedValue={selectedCountry}
          style={styles.picker}
          onValueChange={handleCountryChange}
        >
          <Picker.Item label="United States" value="US" />
          <Picker.Item label="Kosovo" value="XK" />
          <Picker.Item label="Germany" value="DE" />
          <Picker.Item label="Italy" value="IT" />
          {/* Add more countries as needed */}
        </Picker>
        <FlatList
          data={holidays}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.holidayItem}>
              <Text style={styles.holidayName}>{item.name}</Text>
              <Text style={styles.holidayDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background image covers the screen
    justifyContent: 'center', // Center the content
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background to make the text readable
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
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

export default CountrySelectorScreen;
