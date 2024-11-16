import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { firestore } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function EditEnvironmentScreen({ route, navigation }) {
  const { environment } = route.params;
  const [name, setName] = useState(environment.title);
  const [isIndoor, setIsIndoor] = useState(environment.type === 'Interior');
  const [exposureTime, setExposureTime] = useState(environment.exposureTime || 12);
  const [dimensions, setDimensions] = useState({
    length: environment.length || '',
    width: environment.width || '',
    height: environment.height || '',
  });

  const handleSave = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const envRef = doc(firestore, 'environments', environment.id);

      try {
        await updateDoc(envRef, {
          userId: userId,
          title: name,
          type: isIndoor ? 'Interior' : 'Exterior',
          exposureTime: exposureTime,
          length: dimensions.length,
          width: dimensions.width,
          height: dimensions.height,
          updatedAt: new Date(),
        });
        console.log("Ambiente actualizado correctamente");
        navigation.goBack();
      } catch (error) {
        console.error("Error al actualizar ambiente:", error);
      }
    } else {
      console.log("Usuario no autenticado");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de Ambiente</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del Ambiente"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Tipo de Ambiente</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Interior</Text>
        <Switch
          value={isIndoor}
          onValueChange={() => setIsIndoor(!isIndoor)}
        />
        <Text style={styles.switchLabel}>Exterior</Text>
      </View>

      <Text style={styles.label}>Tiempo de Exposición</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.exposureLabel}>{exposureTime} horas</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={24}
          step={1}
          value={exposureTime}
          onValueChange={setExposureTime}
          minimumTrackTintColor="#A3D77F"
          maximumTrackTintColor="#777"
        />
      </View>

      <Text style={styles.label}>Configuraciones Opcionales</Text>
      <View style={styles.dimensionsContainer}>
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          value={dimensions.length}
          onChangeText={(value) => setDimensions({ ...dimensions, length: value })}
          placeholder="Largo"
          placeholderTextColor="#777"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          value={dimensions.width}
          onChangeText={(value) => setDimensions({ ...dimensions, width: value })}
          placeholder="Ancho"
          placeholderTextColor="#777"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.dimensionInput]}
          value={dimensions.height}
          onChangeText={(value) => setDimensions({ ...dimensions, height: value })}
          placeholder="Altura"
          placeholderTextColor="#777"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>GUARDAR</Text>
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
  label: {
    color: '#A3D77F',
    marginVertical: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginVertical: 16,
  },
  exposureLabel: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  dimensionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dimensionInput: {
    width: '48%',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#A3D77F',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
