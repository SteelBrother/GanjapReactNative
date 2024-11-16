import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function PlantCreationScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    { id: '1', title: 'Germinación', description: 'De semilla a plántula...', icon: { name: 'seedling', type: 'font-awesome-5' }, buttonText: 'Crear Germinación' },
    { id: '2', title: 'Plántula', description: 'Aparecen los cotiledones...', icon: { name: 'leaf', type: 'font-awesome' }, buttonText: 'Crear Plántula' },
    { id: '3', title: 'Vegetativo', description: 'La planta produce tallos...', icon: { name: 'tree', type: 'font-awesome' }, buttonText: 'Crear Vegetativo' },
    { id: '4', title: 'Floración', description: 'La planta desarrolla flores...', icon: { name: 'flower', type: 'material-community' }, buttonText: 'Crear Floración' },
  ];

  const handleCreateStage = async () => {
    if (!plantName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la planta');
      return;
    }
    if (!selectedStage) {
      Alert.alert('Error', 'Por favor selecciona una etapa para la planta');
      return;
    }
    try {
      if (currentUser) {
        const plantRef = await addDoc(collection(firestore, 'plants'), {
          userId: currentUser.uid,
          name: plantName,
          stage: selectedStage.title,
          stageId: selectedStage.id,
        });
        console.log("Planta en etapa", selectedStage.title, "creada con ID:", plantRef.id);
        setModalVisible(false);
        setPlantName('');
        setSelectedStage(null);
        navigation.navigate('SelectEnvironmentScreen', { plantId: plantRef.id });
      }
    } catch (error) {
      console.error("Error al crear planta:", error);
      Alert.alert('Error', 'Hubo un problema al crear la planta. Por favor, intenta de nuevo.');
    }
  };

  const openModal = (stage) => {
    setSelectedStage(stage);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Crear una Planta Nueva</Text>
      {stages.map((stage) => (
        <View key={stage.id} style={styles.stageCard}>
          <Icon name={stage.icon.name} type={stage.icon.type} size={50} color="#A3D77F" />
          <Text style={styles.stageTitle}>{stage.title}</Text>
          <Text style={styles.stageDescription}>{stage.description}</Text>
          <Button title={stage.buttonText} buttonStyle={styles.stageButton} onPress={() => openModal(stage)} />
        </View>
      ))}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nombre de la Planta</Text>
            <TextInput placeholder="Ingresa el nombre de la planta" value={plantName} onChangeText={setPlantName} style={styles.input} placeholderTextColor="#CCCCCC" />
            <Button title="Guardar" buttonStyle={styles.saveButton} onPress={handleCreateStage} />
            <Button title="Cancelar" buttonStyle={styles.cancelButton} onPress={() => { setModalVisible(false); setPlantName(''); setSelectedStage(null); }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  stageCard: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 12,
  },
  stageDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 16,
  },
  stageButton: {
    backgroundColor: '#A3D77F',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A3D77F',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444444',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#A3D77F',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    width: '100%',
  },
});
