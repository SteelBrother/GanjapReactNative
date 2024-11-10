import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const DateComponent = memo(({ date, onSelectDate, selected }) => {
  const isSelected = selected === date;
  const day = moment(date).format('D'); // Muestra solo el día del mes

  return (
    <TouchableOpacity
      style={[styles.date, isSelected && styles.selectedDate]}
      onPress={() => onSelectDate(date)}
    >
      <Text style={styles.dateText}>{day}</Text>
    </TouchableOpacity>
  );
});

export default DateComponent;

const styles = StyleSheet.create({
  date: {
    padding: 8,
    margin: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
    width: 40, // Ancho más pequeño para centrarse solo en el día del mes
    height: 40, // Altura más pequeña
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#ADD8E6', // Cambia el color según prefieras
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});