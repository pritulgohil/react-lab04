import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {firebase} from '../firebaseConfig';

const HomeScreen = ({navigation}) => {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        console.log('Fetching cabs data from Firebase...');
        const snapshot = await firebase.database().ref('/cabs').once('value');
        const cabsList = [];
        snapshot.forEach(childSnapshot => {
          console.log('Child Snapshot:', childSnapshot.val());
          cabsList.push({id: childSnapshot.key, ...childSnapshot.val()});
        });
        console.log('Cabs List:', cabsList);
        setCabs(cabsList);
      } catch (error) {
        console.error('Error fetching cabs:', error);
      }
    };
    fetchCabs();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('CabDetail', {cab: item})}>
            <ImageBackground source={{uri: item.imageUrl}} style={styles.image}>
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.carModel}>{item.carModel}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carModel: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
