// src/components/shared/InfoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoCard = ({ title, value, unit, status }) => {
  const getColor = () => {
    switch (status) {
      case 'optimal':
        return 'green';
      case 'moderate':
        return 'yellow';
      case 'critical':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name={getIcon(title)} size={24} color={getColor()} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value} {unit}</Text>
      <Text style={[styles.status, { color: getColor() }]}>{status === 'optimal' ? 'Niveles óptimos' : status === 'moderate' ? 'Niveles moderados' : 'Niveles críticos'}</Text>
      <Text style={styles.context}>Temperatura ideal: 20-25°C</Text>
    </View>
  );
};

const getIcon = (title) => {
  switch (title) {
    case 'Temperatura':
      return 'thermometer-half';
    case 'Humedad':
      return 'tint';
    case 'Luz Solar':
      return 'sun-o';
    case 'CO₂':
      return 'cloud';
    default:
      return 'question-circle';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
    width: '48%', // Ajusta el ancho aquí para permitir 2 por fila
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
  context: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default InfoCard;
