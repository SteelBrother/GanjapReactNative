import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firestore } from '../utils/firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { screen } from "../utils/screenName";

export default function SelectEnvironmentScreen({ route }) {
  const [environments, setEnvironments] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { plantId } = route.params || {};

  useEffect(() => {
    const fetchEnvironments = async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(firestore, 'environments'),
            where('userId', '==', currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const envData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEnvironments(envData);
        } catch (error) {
          console.error("Error al obtener ambientes:", error);
        }
      }
    };
    fetchEnvironments();
  }, [currentUser]);

  const handleEnvironmentSelect = async (environment) => {
    if (!plantId) {
      console.error("No se ha proporcionado el ID de la planta.");
      navigation.goBack();
      return;
    }

    try {
      const plantRef = doc(firestore, 'plants', plantId);
      await updateDoc(plantRef, {
        environmentId: environment.id,
        environmentTitle: environment.title,
      });
      console.log('Ambiente seleccionado y relacionado con la planta');
      navigation.navigate(screen.Plants.plantas);
    } catch (error) {
      console.error("Error al relacionar ambiente:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Elegir el ambiente</Text>
      {environments.map((environment) => (
        <TouchableOpacity
          key={environment.id}
          style={styles.environmentItem}
          onPress={() => handleEnvironmentSelect(environment)}
        >
          <Text style={styles.environmentText}>{environment.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  environmentItem: {
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 8,
    marginVertical: 8,
  },
  environmentText: {
    color: '#A3D77F',
    fontSize: 16,
  },
});
