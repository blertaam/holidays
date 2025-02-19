import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, 
  StyleSheet, TouchableOpacity, Dimensions 
} from 'react-native';

const API_KEY = 'd9d2d1b6-661f-4ae9-a8a9-e845a4da60fa';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 5.5; // Adjusted for 5 items per row

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
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={holidays}
          keyExtractor={(item) => item.date}
          numColumns={5} // Display 5 items per row
          showsVerticalScrollIndicator={false} // Hides the scrollbar
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Details', { holiday: item })}
              style={styles.touchable}
            >
              <View style={styles.holidayCard}>
                <Text style={styles.holidayName} numberOfLines={2}>{item.name}</Text>
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
    paddingVertical: 10,
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
  },
  touchable: {
    margin: 4,
    alignItems: 'center',
  },
  holidayCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#2A2A3A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  holidayName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  holidayDate: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default HomeScreen;
