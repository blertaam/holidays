import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';

const API_KEY = 'd9d2d1b6-661f-4ae9-a8a9-e845a4da60fa';

const CalendarScreen = ({ navigation }) => {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHolidaysForMonth = (year, month) => {
    setLoading(true);
    fetch(`https://holidayapi.com/v1/holidays?pretty&country=US&year=${year}&month=${month}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setHolidays(data.holidays || []);
      })
      .catch(() => alert('Failed to fetch holidays'))
      .finally(() => setLoading(false));
  };

  const fetchHolidayDetails = (date) => {
    setLoading(true);
    fetch(`https://holidayapi.com/v1/holidays?pretty&country=US&year=2024&date=${date}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const holiday = data.holidays && data.holidays[0]; // Assuming only one holiday per date
        if (holiday) {
          navigation.navigate('Details', { holiday });
        } else {
          alert('No holiday found for this date');
        }
      })
      .catch(() => alert('Failed to fetch holiday details'))
      .finally(() => setLoading(false));
  };

  // When a month is changed, fetch the holidays for the new month
  const onMonthChange = (month) => {
    const monthNumber = month.month;
    setHolidays([]); // Clear previous holidays
    fetchHolidaysForMonth(2024, monthNumber);
  };

  // When a date is pressed on the calendar
  const handleDatePress = (day) => {
    setSelectedDate(day.dateString); // Set the selected date
    fetchHolidayDetails(day.dateString); // Fetch holiday details for that specific date
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick a Month to See Holidays</Text>

      {/* Calendar component */}
      <Calendar
        onMonthChange={onMonthChange} // Triggered when the month changes
        onDayPress={handleDatePress}  // Triggered when a day is pressed
        markedDates={{
          '2024-01-01': { marked: true, selected: true, selectedColor: 'blue' },
          // Add other marked dates here
        }}
        style={styles.calendar}
      />

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* List of Holidays for the selected month */}
      <Text style={styles.subHeader}>Holidays for Selected Month</Text>
      <FlatList
        data={holidays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.holidayItem} onPress={() => navigation.navigate('Details', { holiday: item })}>
            <Text style={styles.holidayName}>{item.name}</Text>
            <Text style={styles.holidayDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
    height: 300, // Reduced the height of the calendar for better balance
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
  flatListContainer: {
    paddingBottom: 80, // This increases the scrollable area and space for holidays
    maxHeight: 400, // Makes the list container have a fixed height, so it's scrollable if there are many items
  },
});

export default CalendarScreen;
