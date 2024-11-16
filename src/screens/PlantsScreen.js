import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { firestore } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

export default function PlantsScreen() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const fetchPlants = async () => {
    try {
      if (currentUser) {
        const q = query(collection(firestore, 'plants'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const plantsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlants(plantsList);
      }
    } catch (error) {
      console.error("Error al cargar plantas:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlants();
    }, [])
  );

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PlantDetailScreen', { plantId: item.id })}>
      <View style={styles.plantCard}>
        <Image source={{ uri: item.image || '../../assets/img/plant.jpg' }} style={styles.plantImage} />
        <View>
          <Text style={styles.plantName}>{item.name}</Text>
          <Text style={styles.plantStage}>Etapa: {item.stage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        <FlatList data={plants} renderItem={renderPlantItem} keyExtractor={(item) => item.id} />
      )}
      <FAB icon={<Icon name="add" color="#fff" />} placement="right" onPress={() => navigation.navigate('PlantCreationScreen')} color="#A3D77F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  headerText: {
    fontSize: 22,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#A3D77F',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 20,
  },
  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderColor: '#A3D77F',
    borderWidth: 1,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  plantStage: {
    fontSize: 14,
    color: '#A3D77F',
  },
  fabStyle: {
    backgroundColor: '#A3D77F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
