// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Calendar from '../components/shared/Calendar';
import InfoCard from '../components/shared/InfoCard';
import ActionButton from '../components/shared/ActionButton';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [environmentalData, setEnvironmentalData] = useState({});

  const dataExample = {
    '2024-11-01': {
      temperature: { value: 22, unit: '°C', status: 'optimal' },
      humidity: { value: 50, unit: '%', status: 'optimal' },
      light: { value: 8, unit: 'horas', status: 'optimal' },
      co2: { value: 380, unit: 'ppm', status: 'optimal' },
    },
    // Otros datos de ejemplo...
  };

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      setEnvironmentalData(dataExample[formattedDate] || {});
    }
  }, [selectedDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      </View>

      <View style={styles.mainActionsContainer}>
        <ActionButton title="Acción" iconName="flash" onPress={() => console.log('Acción')} />
        <ActionButton title="Log de planta" iconName="document-text" onPress={() => console.log('Log de planta')} />
        <ActionButton title="Foto" iconName="camera" onPress={() => console.log('Foto')} />
        <ActionButton title="Más" iconName="ellipsis-horizontal" onPress={() => console.log('Más')} />
      </View>

      <Text style={styles.sectionTitle}>ACCIONES INSTANTÁNEAS</Text>
      <View style={styles.instantActionsContainer}>
        <ActionButton title="Regado" iconName="water" onPress={() => console.log('Regado')} />
        <ActionButton title="Nutrientes" iconName="leaf" onPress={() => console.log('Nutrientes')} />
        <ActionButton title="Repelente" iconName="bug" onPress={() => console.log('Repelente')} />
        <ActionButton title="Poda" iconName="cut" onPress={() => console.log('Poda')} />
      </View>

      <Text style={styles.sectionTitle}>INFORMACIÓN DEL DÍA</Text>
      <View style={styles.infoCardsContainer}>
        <InfoCard title="Temperatura" value={environmentalData.temperature?.value} unit={environmentalData.temperature?.unit} status={environmentalData.temperature?.status} />
        <InfoCard title="Humedad" value={environmentalData.humidity?.value} unit={environmentalData.humidity?.unit} status={environmentalData.humidity?.status} />
        <InfoCard title="Luz Solar" value={environmentalData.light?.value} unit={environmentalData.light?.unit} status={environmentalData.light?.status} />
        <InfoCard title="CO₂" value={environmentalData.co2?.value} unit={environmentalData.co2?.unit} status={environmentalData.co2?.status} />
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  calendarContainer: {
    width: '100%',
  },
  mainActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  sectionTitle: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 10,
  },
  instantActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
