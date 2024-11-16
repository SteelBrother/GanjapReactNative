import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español
import { Moon } from 'lunarphase-js';

moment.locale('es'); // Configura moment para usar español

const Calendar = ({ onSelectDate, selected }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [lunarPhase, setLunarPhase] = useState('new'); // Fase lunar inicial

  useEffect(() => {
    calculateLunarPhase();
  }, []);

  const calculateLunarPhase = () => {
    const phase = Moon.lunarPhase();
    setLunarPhase(phase.toLowerCase().replace(' ', '-'));
  };

  const getBackgroundImage = () => {
    switch (lunarPhase) {
      case 'new':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Luna Nueva"
      case 'waxing-crescent':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Creciente"
      case 'first-quarter':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Primer Cuarto"
      case 'waxing-gibbous':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Gibosa Creciente"
      case 'full':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Luna Llena"
      case 'waning-gibbous':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Gibosa Menguante"
      case 'last-quarter':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Último Cuarto"
      case 'waning-crescent':
        return require('../../../assets/favicon.png'); // Cambia a tu imagen de "Menguante"
      default:
        return require('../../../assets/favicon.png'); // Imagen por defecto
    }
  };

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <CalendarStrip
          scrollable={true}
          style={styles.calendarStrip}
          calendarHeaderStyle={styles.calendarHeader}
          calendarHeaderFormat={'MMMM YYYY'}
          dateNumberStyle={styles.dateNumber}
          dateNameStyle={styles.dateName}
          weekendDateNameStyle={styles.weekendDateName}
          weekendDateNumberStyle={styles.weekendDateNumber}
          highlightDateNameStyle={styles.highlightDateName}
          highlightDateNumberStyle={styles.highlightDateNumber}
          highlightDateContainerStyle={styles.highlightDateContainer}
          markedDates={[
            {
              date: moment(),
              dots: [{ color: 'green', selectedColor: 'blue' }],
            },
          ]}
          datesWhitelist={[
            {
              start: moment().subtract(1, 'year'), // Un rango amplio para permitir seleccionar fechas.
              end: moment().add(1, 'year'),
            },
          ]}
          startingDate={currentMonth}
          selectedDate={selected ? moment(selected) : null}
          onDateSelected={(date) => {
            console.log(`Fecha seleccionada: ${date.format('YYYY-MM-DD')}`);
            if (onSelectDate) {
              onSelectDate(date.format('YYYY-MM-DD'));
            }
          }}
          onWeekChanged={(start, end) =>
            console.log(`Semana cambiada: ${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}`)
          }
          daySelectionAnimation={{
            type: 'background',
            duration: 300,
            highlightColor: '#c8e6c9',
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Agrega un efecto de transparencia oscuro
    justifyContent: 'center',
  },
  calendarStrip: {
    height: 200,
    paddingTop: 20,
    paddingBottom: 10,
  },
  calendarHeader: {
    color: 'white',
    fontSize: 20,
  },
  dateNumber: {
    color: 'white',
    fontSize: 16,
  },
  dateName: {
    color: 'white',
    fontSize: 14,
  },
  weekendDateName: {
    color: 'orange',
  },
  weekendDateNumber: {
    color: 'orange',
  },
  highlightDateName: {
    color: 'green', // Cambiado a verde
    fontWeight: 'bold',
  },
  highlightDateNumber: {
    color: 'green', // Cambiado a verde
    fontWeight: 'bold',
  },
  highlightDateContainer: {
    backgroundColor: '#c8e6c9',
    borderRadius: 20,
  },
});
