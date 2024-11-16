import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { firestore } from '../utils/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function PlantDetailScreen({ route }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const plantRef = doc(firestore, 'plants', plantId);
        const plantSnap = await getDoc(plantRef);
        if (plantSnap.exists()) {
          setPlant(plantSnap.data());
        } else {
          console.error("No se encontró la planta");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la planta:", error);
      }
    };

    const fetchActions = async () => {
      try {
        const actionsQuery = query(collection(firestore, 'actions'), where('selectedPlant', '==', plantId));
        const querySnapshot = await getDocs(actionsQuery);
        const actionsList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setActions(actionsList);
      } catch (error) {
        console.error("Error al obtener las acciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
    fetchActions();
  }, [plantId]);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (!plant) {
    return <Text style={styles.errorText}>No se pudo cargar la planta</Text>;
  }

  const renderActionItem = ({ item }) => {
    const iconMap = {
      'Regado': 'water',
      'Nutrientes': 'sprout',
      'Repelente': 'bug',
      'Trasplante': 'shovel',
      'Poda': 'scissors-cutting',
      'Entrenamiento': 'arm-flex',
      'Cambiar Ambiente': 'home-switch',
      'Lavado de raíces': 'shower',
      'Cosechar': 'fruit-grapes',
      'Declarar Muerte': 'skull',
      'Otro': 'dots-horizontal',
    };

    return (
      <View style={styles.timelineEvent}>
        <Icon
          name={iconMap[item.action] || 'alert-circle-outline'}
          type="material-community"
          color="#A3D77F"
          size={24}
        />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{item.action}</Text>
          <Text style={styles.eventDescription}>{item.description || 'Sin descripción'}</Text>
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: plant.image || 'https://via.placeholder.com/150' }} style={styles.plantImage} />
      <Text style={styles.plantTitle}>{plant.name || 'Genética desconocida'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles de la Planta</Text>
        <Text style={styles.sectionContent}>Etapa: {plant.stage || 'Desconocida'}</Text>
        <Text style={styles.sectionContent}>Ambiente: {plant.environmentName || 'Desconocido'}</Text>
        <Text style={styles.sectionContent}>Tipo de ambiente: {plant.environmentType || 'Interior'}</Text>
        <Text style={styles.sectionContent}>Exposición: {plant.exposureTime || '12 Horas'}</Text>
        <Text style={styles.sectionContent}>Luces: {plant.lights || 'Sin información de luces'}</Text>
        <Text style={styles.sectionContent}>Día {plant.day || 1}, Semana {plant.week || 1}</Text>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.timelineTitle}>Línea de Tiempo</Text>
        {actions.length > 0 ? (
          <FlatList
            data={actions}
            renderItem={renderActionItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noActionsText}>No se han registrado acciones.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  loadingText: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
  plantImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  plantTitle: {
    fontSize: 24,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  timeline: {
    borderTopWidth: 1,
    borderTopColor: '#A3D77F',
    paddingTop: 16,
    marginTop: 16,
  },
  timelineTitle: {
    fontSize: 18,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timelineEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventDetails: {
    marginLeft: 10,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    color: '#A3D77F',
    fontWeight: 'bold',
  },
  eventDescription: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  eventDate: {
    color: '#888',
    fontSize: 12,
  },
  noActionsText: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 10,
  },
});
