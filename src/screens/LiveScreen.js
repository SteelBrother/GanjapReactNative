import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// Configura el manejo de notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Función para generar valores aleatorios dentro de un rango
const generateRandomValue = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// Función para determinar el estado según el valor
const getStatus = (value, min, max) => {
  if (value < min) return 'bajo';
  if (value > max) return 'alto';
  return 'óptimo';
};

// Función para enviar una notificación
const sendNotification = async (sensorName, value, status) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Alerta de Sensor',
      body: `El sensor de ${sensorName} está en un nivel ${status}: ${value}`,
    },
    trigger: null,
  });
};

// Componente InfoCard para mostrar cada medición
const InfoCard = ({ title, value, unit, status, iconName }) => {
  const statusColors = {
    bajo: '#ff6347', // rojo
    óptimo: '#32cd32', // verde
    alto: '#ffa500', // amarillo
  };
  
  return (
    <View style={[styles.card, { backgroundColor: statusColors[status] }]}>
      <FontAwesome name={iconName} size={24} color="white" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value} {unit}</Text>
    </View>
  );
};

export default function LiveScreen() {
  const [temperature, setTemperature] = useState(generateRandomValue(22, 28));
  const [humidity, setHumidity] = useState(generateRandomValue(50, 70));
  const [co2, setCo2] = useState(generateRandomValue(350, 800));
  const [ph, setPh] = useState(generateRandomValue(6.0, 7.0));
  const [light, setLight] = useState(generateRandomValue(300, 800));
  const [soilMoisture, setSoilMoisture] = useState(generateRandomValue(30, 70));
  const [ec, setEc] = useState(generateRandomValue(1.5, 2.0));
  const [windSpeed, setWindSpeed] = useState(generateRandomValue(0, 10));
  const [airQuality, setAirQuality] = useState(generateRandomValue(0, 150));
  const [pressure, setPressure] = useState(generateRandomValue(1010, 1020));

  // Estado para almacenar el último estado notificado
  const [lastStatus, setLastStatus] = useState({
    temperature: 'óptimo',
    humidity: 'óptimo',
    co2: 'óptimo',
    ph: 'óptimo',
    light: 'óptimo',
    soilMoisture: 'óptimo',
    ec: 'óptimo',
    windSpeed: 'óptimo',
    airQuality: 'óptimo',
    pressure: 'óptimo',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Actualiza los valores de los sensores
      const newTemperature = (parseFloat(temperature) + (Math.random() - 0.5) * 2).toFixed(2);
      setTemperature(newTemperature);
      const newHumidity = Math.min(100, Math.max(0, (parseFloat(humidity) + (Math.random() - 0.5) * 2).toFixed(2)));
      setHumidity(newHumidity);
      const newCo2 = Math.min(2000, Math.max(300, (parseFloat (co2) + (Math.random() - 0.5) * 10).toFixed(2)));
      setCo2(newCo2);
      const newPh = Math.min(7.5, Math.max(5.5, (parseFloat(ph) + (Math.random() - 0.5) * 0.1).toFixed(2)));
      setPh(newPh);
      const newLight = Math.min(1000, Math.max(50, (parseFloat(light) + (Math.random() - 0.5) * 50).toFixed(2)));
      setLight(newLight);
      const newSoilMoisture = Math.min(100, Math.max(0, (parseFloat(soilMoisture) + (Math.random() - 0.5) * 3).toFixed(2)));
      setSoilMoisture(newSoilMoisture);
      const newEc = Math.min(3.0, Math.max(1.0, (parseFloat(ec) + (Math.random() - 0.5) * 0.05).toFixed(2)));
      setEc(newEc);
      const newWindSpeed = Math.min(50, Math.max(0, (parseFloat(windSpeed) + (Math.random() - 0.5) * 2).toFixed(2)));
      setWindSpeed(newWindSpeed);
      const newAirQuality = Math.min(500, Math.max(0, (parseFloat(airQuality) + (Math.random() - 0.5) * 5).toFixed(2)));
      setAirQuality(newAirQuality);
      const newPressure = Math.min(1050, Math.max(950, (parseFloat(pressure) + (Math.random() - 0.5) * 0.2).toFixed(2)));
      setPressure(newPressure);

      // Lista de sensores para verificar y notificar
      const sensors = [
        { value: newTemperature, min: 22, max: 28, name: 'Temperatura' },
        { value: newHumidity, min: 50, max: 70, name: 'Humedad' },
        { value: newCo2, min: 350, max: 800, name: 'CO₂' },
        { value: newPh, min: 6.0, max: 7.0, name: 'pH' },
        { value: newLight, min: 300, max: 800, name: 'Luminosidad' },
        { value: newSoilMoisture, min: 30, max: 70, name: 'Humedad del Suelo' },
        { value: newEc, min: 1.5, max: 2.0, name: 'EC (Conductividad)' },
        { value: newWindSpeed, min: 0, max: 15, name: 'Viento' },
        { value: newAirQuality, min: 0, max: 150, name: 'Calidad del Aire' },
        { value: newPressure, min: 1010, max: 1020, name: 'Presión Atmosférica' },
      ];

      sensors.forEach(sensor => {
        const status = getStatus(sensor.value, sensor.min, sensor.max);
        // Solo envía notificación si el estado es 'bajo' y es diferente del último estado notificado
        if (status === 'bajo' && status !== lastStatus[sensor.name.toLowerCase()]) {
          sendNotification(sensor.name, sensor.value, status);
          setLastStatus(prevStatus => ({
            ...prevStatus,
            [sensor.name.toLowerCase()]: status,
          }));
        }
      });

    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, [temperature, humidity, co2, ph, light, soilMoisture, ec, windSpeed, airQuality, pressure]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores en Tiempo Real</Text>
      <View style={styles.cardContainer}>
        <InfoCard title="Temperatura" value={temperature} unit="°C" status={getStatus(temperature, 22, 28)} iconName="thermometer" />
        <InfoCard title="Humedad" value={humidity} unit="%" status={getStatus(humidity, 50, 70)} iconName="tint" />
        <InfoCard title="CO₂" value={co2} unit="ppm" status={getStatus(co2, 350, 800)} iconName="cloud" />
        <InfoCard title="pH" value={ph} unit="" status={ getStatus(ph, 6.0, 7.0)} iconName="adjust" />
        <InfoCard title="Luminosidad" value={light} unit="Lux" status={getStatus(light, 300, 800)} iconName="sun-o" />
        <InfoCard title="Humedad del Suelo" value={soilMoisture} unit="%" status={getStatus(soilMoisture, 30, 70)} iconName="leaf" />
        <InfoCard title="EC" value={ec} unit="dS/m" status={getStatus(ec, 1.5, 2.0)} iconName="bar-chart" />
        <InfoCard title="Viento" value={windSpeed} unit="km/h" status={getStatus(windSpeed, 0, 15)} iconName="wind" />
        <InfoCard title="Calidad del Aire" value={airQuality} unit="ppm" status={getStatus(airQuality, 0, 150)} iconName="cloud" />
        <InfoCard title="Presión" value={pressure} unit="hPa" status={getStatus(pressure, 1010, 1020)} iconName="tint" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    color: 'white',
  },
});