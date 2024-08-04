import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../firebaseConfig';
import {CabContext} from '../context/CabContext';

const MyCabScreen = () => {
  const {bookedCabs, setBookedCabs} = useContext(CabContext);

  useEffect(() => {
    const fetchBookedCabs = async () => {
      try {
        console.log('Fetching booked cabs');
        const bookingsList = [];
        const snapshot = await firebase
          .database()
          .ref('/bookings')
          .once('value');
        snapshot.forEach(childSnapshot => {
          bookingsList.push({id: childSnapshot.key, ...childSnapshot.val()});
        });
        console.log('Fetched booked cabs:', bookingsList);
        setBookedCabs(bookingsList);
      } catch (error) {
        console.error('Error fetching booked cabs:', error);
      }
    };
    fetchBookedCabs();
  }, []);

  const cancelBooking = async bookingId => {
    try {
      console.log('Cancelling booking:', bookingId);
      await firebase.database().ref(`/bookings/${bookingId}`).remove();
      setBookedCabs(bookedCabs.filter(cab => cab.id !== bookingId));
      Alert.alert('Success', 'Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Alert.alert(
        'Error',
        'There was an error cancelling the booking. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookedCabs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <ImageBackground source={{uri: item.imageUrl}} style={styles.image}>
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Car Model: {item.carModel}</Text>
                <Text style={styles.label}>Company: {item.companyName}</Text>
              </View>
            </ImageBackground>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => cancelBooking(item.id)}>
              <Text style={styles.buttonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyCabScreen;
