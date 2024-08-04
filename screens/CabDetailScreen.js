import React, {useContext} from 'react';
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
import {firebase} from '../firebaseConfig';
import {CabContext} from '../context/CabContext';

const CabDetailScreen = ({route}) => {
  const {cab} = route.params;
  const {bookedCabs, setBookedCabs} = useContext(CabContext);

  const bookCab = async () => {
    if (bookedCabs.length >= 2) {
      Alert.alert(
        'Booking Error',
        'You cannot book more than 2 cabs at a time.',
      );
      return;
    }
    try {
      console.log('Attempting to book cab:', cab.carModel);
      const newBookingRef = firebase.database().ref('/bookings').push();
      await newBookingRef.set({
        carModel: cab.carModel,
        companyName: cab.companyName,
        imageUrl: cab.imageUrl,
      });
      console.log('Booking successful:', newBookingRef.key);
      setBookedCabs([
        ...bookedCabs,
        {
          id: newBookingRef.key,
          carModel: cab.carModel,
          companyName: cab.companyName,
          imageUrl: cab.imageUrl,
        },
      ]);
      Alert.alert('Success', 'Cab booked successfully!');
    } catch (error) {
      console.error('Error booking cab:', error);
      Alert.alert(
        'Error',
        'There was an error booking the cab. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: cab.imageUrl}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{cab.companyName}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{cab.carModel}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Passengers:</Text>
          <Text style={styles.value}>{cab.passengerCount}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{cab.rating}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Cost/hour:</Text>
          <Text style={styles.value}>{cab.costPerHour}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Book Cab" onPress={bookCab} color="#ff6347" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CabDetailScreen;
