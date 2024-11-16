import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { firestore } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; // Importa la autenticación de Firebase

export default function EnvironmentsScreen() {
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Obtén el usuario autenticado de Firebase Auth
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      console.log("Usuario no autenticado");
    }
  }, []);

  const environments = [
    {
      id: '1',
      title: 'Interior',
      description: '¿Estás cultivando en interiores? Cree un "ambiente interior" y establezca el tamaño de su ambiente, sus luces y tiempo de exposición.',
      iconName: 'plant-pot',
      buttonText: 'CREAR INTERIOR',
    },
    {
      id: '2',
      title: 'Exterior',
      description: '¿Estás cultivando al aire libre? Crea un "Ambiente Exterior" y registra cuántas horas de luz solar reciben tus plantas.',
      iconName: 'tree-outline',
      buttonText: 'CREAR EXTERIOR',
    },
  ];

  const createEnvironment = async (environment) => {
    if (!userId) {
      console.error("Error: userId es indefinido");
      return;
    }
    try {
      await addDoc(collection(firestore, 'environments'), {
        userId: userId,
        title: environment.title,
        description: environment.description,
        createdAt: new Date(),
      });
      console.log(`Ambiente ${environment.title} creado`);
      navigation.navigate('EnvironmentList');
    } catch (error) {
      console.error("Error al crear ambiente:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {environments.map((environment) => (
        <View key={environment.id} style={styles.card}>
          <Icon name={environment.iconName} type="material-community" color="#A3D77F" size={40} />
          <Text style={styles.title}>{environment.title}</Text>
          <Text style={styles.description}>{environment.description}</Text>
          <Button
            title={environment.buttonText}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => createEnvironment(environment)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#A3D77F',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
