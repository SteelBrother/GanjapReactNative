import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { firestore } from '../utils/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function EnvironmentList() {
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      console.log("Usuario no autenticado");
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const environmentsRef = collection(firestore, 'environments');
    const q = query(environmentsRef, where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const environmentsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnvironments(environmentsList);
      setLoading(false);
    }, (error) => {
      console.error("Error al obtener ambientes:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#A3D77F" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ambientes</Text>
      {environments.length === 0 ? (
        <Text style={styles.emptyText}>No tienes ambientes guardados</Text>
      ) : (
        <FlatList
          data={environments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.environmentCard}>
              {/* Imagen condicional */}
              <Image
                source={
                  item.title === 'Interior'
                    ? require('../../assets/img/interior.jpg')
                    : require('../../assets/img/exterior.jpg')
                }
                style={styles.environmentImage}
                resizeMode="cover"
              />
              <View style={styles.cardHeader}>
                <Text style={styles.environmentTitle}>{item.title}</Text>
                <Text style={styles.environmentDescription}>{item.description}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AddEnvironmentLog', { environmentId: item.id, environmentName: item.title })}
                >
                  <Text style={styles.buttonText}>AGREGAR LOG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('EditEnvironment', { environment: item })}
                >
                  <Text style={styles.buttonText}>EDITAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('EnvironmentsScreen')}
      >
        <Text style={styles.createButtonText}>CREAR NUEVO AMBIENTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 20,
  },
  environmentCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderColor: '#444',
    borderWidth: 1,
  },
  environmentImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardHeader: {
    marginBottom: 8,
  },
  environmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A3D77F',
  },
  environmentDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#A3D77F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#A3D77F',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  createButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
