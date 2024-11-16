// src/screens/AddEnvironmentLogScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { firestore } from '../utils/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddEnvironmentLogScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { environmentId, environmentName } = route.params;
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [measurement, setMeasurement] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const measurementOptions = [
    { label: 'Humedad', value: 'humidity' },
    { label: 'Temperatura del Ambiente', value: 'ambientTemperature' },
    { label: 'Temperatura Exterior', value: 'externalTemperature' },
    { label: 'Distancia de luz', value: 'lightDistance' },
    { label: 'CO₂', value: 'co2' },
    { label: 'Precipitaciones', value: 'precipitations' },
    { label: 'PPFD promedio', value: 'averagePPFD' },
    { label: 'VPD', value: 'vpd' },
  ];

  const handleSaveLog = async () => {
    try {
      const logData = {
        date: Timestamp.fromDate(selectedDate),
        note,
        measurement,
        environmentId,
      };

      const logRef = doc(firestore, 'environmentLogs', `${environmentId}_${Date.now()}`);
      await setDoc(logRef, logData);

      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el log:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Agregar log de ambiente</Text>
      <Text style={styles.environmentName}>{environmentName}</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      <TextInput
        style={styles.noteInput}
        placeholder="Nota"
        placeholderTextColor="#CCCCCC"
        value={note}
        onChangeText={setNote}
      />

      <Text style={styles.label}>Agregar una medición</Text>
      <FlatList
        data={measurementOptions}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.measurementOption,
              measurement === item.value && styles.selectedOption,
            ]}
            onPress={() => setMeasurement(item.value)}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={handleSaveLog} style={styles.saveButton}>
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A3D77F',
    marginBottom: 8,
  },
  environmentName: {
    fontSize: 16,
    color: '#A3D77F',
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    color: '#FFFFFF',
  },
  noteInput: {
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#A3D77F',
    marginBottom: 8,
  },
  measurementOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#A3D77F',
  },
  optionText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#A3D77F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
});
