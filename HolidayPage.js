import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';


const HolidayPage = () => {

  const [holidays, setHolidays] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchHolidays = async () => {

      try {

        const response = await fetch('https://holidayapi.com/v1/holidays?pretty&country=XK&year=2024&key=d9d2d1b6-661f-4ae9-a8a9-e845a4da60fa');

        if (!response.ok) {

          throw new Error('Network response was not ok');

        }

        const data = await response.json();

        setHolidays(data.holidays);

      } catch (err) {

        setError('Failed to fetch holidays');

      } finally {

        setLoading(false);

      }

    };


    fetchHolidays();

  }, []);


  const renderHoliday = ({ item }) => (

    <View style={styles.holidayItem}>

      <Text style={styles.holidayName}>{item.name}</Text>

      <Text style={styles.holidayDate}>{item.date}</Text>

    </View>

  );


  if (loading) {

    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;

  }


  if (error) {

    return <Text style={styles.errorText}>{error}</Text>;

  }


  return (

    <View style={styles.container}>

      <Text style={styles.header}>Public Holidays (US - 2025)</Text>

      <FlatList

        data={holidays}

        keyExtractor={(item) => item.date}

        renderItem={renderHoliday}

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

    marginBottom: 20,

    textAlign: 'center',

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

  loader: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

  },

  errorText: {

    fontSize: 18,

    color: 'red',

    textAlign: 'center',

    marginTop: 20,

  },

});


export default HolidayPage;
