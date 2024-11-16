import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

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
  const [light, setLight] = useState(generateRandomValue(300, 800)); // Lux (luz)
  const [soilMoisture, setSoilMoisture] = useState(generateRandomValue(30, 70)); // Humedad del suelo
  const [ec, setEc] = useState(generateRandomValue(1.5, 2.0)); // Conductividad eléctrica (EC)
  const [windSpeed, setWindSpeed] = useState(generateRandomValue(0, 10)); // Velocidad del viento (km/h)
  const [airQuality, setAirQuality] = useState(generateRandomValue(0, 150)); // Calidad del aire (ppm)
  const [pressure, setPressure] = useState(generateRandomValue(1010, 1020)); // Presión atmosférica (hPa)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        const newTemp = (parseFloat(prevTemp) + (Math.random() - 0.5) * 2).toFixed(2);
        return newTemp;
      });
      setHumidity(prevHumidity => {
        const change = (Math.random() - 0.5) * 2;
        const newHumidity = Math.min(100, Math.max(0, (parseFloat(prevHumidity) + change).toFixed(2)));
        return newHumidity;
      });
      setCo2(prevCo2 => {
        const change = (Math.random() - 0.5) * 10;
        const newCo2 = Math.min(2000, Math.max(300, (parseFloat(prevCo2) + change).toFixed(2)));
        return newCo2;
      });
      setPh(prevPh => {
        const change = (Math.random() - 0.5) * 0.1;
        const newPh = Math.min(7.5, Math.max(5.5, (parseFloat(prevPh) + change).toFixed(2)));
        return newPh;
      });
      setLight(prevLight => {
        const change = (Math.random() - 0.5) * 50;
        const newLight = Math.min(1000, Math.max(50, (parseFloat(prevLight) + change).toFixed(2)));
        return newLight;
      });
      setSoilMoisture(prevMoisture => {
        const change = (Math.random() - 0.5) * 3;
        const newMoisture = Math.min(100, Math.max(0, (parseFloat(prevMoisture) + change).toFixed(2)));
        return newMoisture;
      });
      setEc(prevEc => {
        const change = (Math.random() - 0.5) * 0.05;
        const newEc = Math.min(3.0, Math.max(1.0, (parseFloat(prevEc) + change).toFixed(2)));
        return newEc;
      });
      setWindSpeed(prevWind => {
        const change = (Math.random() - 0.5) * 2;
        const newWind = Math.min(50, Math.max(0, (parseFloat(prevWind) + change).toFixed(2)));
        return newWind;
      });
      setAirQuality(prevQuality => {
        const change = (Math.random() - 0.5) * 5;
        const newQuality = Math.min(500, Math.max(0, (parseFloat(prevQuality) + change).toFixed(2)));
        return newQuality;
      });
      setPressure(prevPressure => {
        const change = (Math.random() - 0.5) * 0.2;
        const newPressure = Math.min(1050, Math.max(950, (parseFloat(prevPressure) + change).toFixed(2)));
        return newPressure;
      });
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores en Tiempo Real</Text>
      <View style={styles.cardContainer}>
        <InfoCard 
          title="Temperatura" 
          value={temperature} 
          unit="°C" 
          status={getStatus(temperature, 22, 28)} 
          iconName="thermometer" 
        />
        <InfoCard 
          title="Humedad" 
          value={humidity} 
          unit="%" 
          status={getStatus(humidity, 50, 70)} 
          iconName="tint" 
        />
        <InfoCard 
          title="CO₂" 
          value={co2} 
          unit="ppm" 
          status={getStatus(co2, 350, 800)} 
          iconName="cloud" 
        />
        <InfoCard 
          title="pH" 
          value={ph} 
          unit="" 
          status={getStatus(ph, 6.0, 7.0)} 
          iconName="adjust" 
        />
        <InfoCard 
          title="Luminosidad" 
          value={light} 
          unit="Lux" 
          status={getStatus(light, 300, 800)} 
          iconName="sun-o" 
        />
        <InfoCard 
          title="Humedad del Suelo" 
          value={soilMoisture} 
          unit="%" 
          status={getStatus(soilMoisture, 30, 70)} 
          iconName="leaf" 
        />
        <InfoCard 
          title="EC (Conductividad)" 
          value={ec} 
          unit="mS/cm" 
          status={getStatus(ec, 1.5, 2.0)} 
          iconName="flash" 
        />
        <InfoCard 
          title="Viento" 
          value={windSpeed} 
          unit="km/h" 
          status={getStatus(windSpeed, 0, 15)} 
          iconName="wind" 
        />
        <InfoCard 
          title="Calidad del Aire" 
          value={airQuality} 
          unit="ppm" 
          status={getStatus(airQuality, 0, 150)} 
          iconName="smog" 
        />
        <InfoCard 
          title="Presión Atmosférica" 
          value={pressure} 
          unit="hPa" 
          status={getStatus(pressure, 1010, 1020)} 
          iconName="arrow-up" 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: '40%',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
});
