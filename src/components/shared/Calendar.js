import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
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
        return require('../../../assets/img/lunanueva.png');
      case 'waxing-crescent':
        return require('../../../assets/img/lunacreciente.png');
      case 'first-quarter':
        return require('../../../assets/img/lunaprimercuarto.png');
      case 'waxing-gibbous':
        return require('../../../assets/img/lunagibosacreciente.png');
      case 'full':
        return require('../../../assets/img/lunallena.png');
      case 'waning-gibbous':
        return require('../../../assets/img/lunagibosamenguante.png');
      case 'last-quarter':
        return require('../../../assets/img/lunaultimocuarto.png');
      case 'waning-crescent':
        return require('../../../assets/img/lunamenguante.png');
      default:
        return require('../../../assets/favicon.png');
    }
  };

  // Función para obtener el nombre de la fase lunar en español
  const getLunarPhaseName = (phase) => {
    switch (phase) {
      case 'new':
        return 'Luna nueva';
      case 'waxing-crescent':
        return 'Luna creciente';
      case 'first-quarter':
        return 'Luna en primer cuarto';
      case 'waxing-gibbous':
        return 'Luna gibosa creciente';
      case 'full':
        return 'Luna llena';
      case 'waning-gibbous':
        return 'Luna gibosa menguante';
      case 'last-quarter':
        return 'Luna en último cuarto';
      case 'waning-crescent':
        return 'Luna menguante';
      default:
        return 'Luna desconocida';
    }
  };

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.lunarInfoContainer}>
          <Text style={styles.lunarPhaseText}>{getLunarPhaseName(lunarPhase)}</Text>
          <Text style={styles.locationText}>Bogotá, DC</Text>
        </View>

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
              start: moment().subtract(1, 'year'),
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
            console.log (`Semana cambiada: ${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}`)
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
  lunarInfoContainer: {
    alignItems: 'center',
    marginBottom: 10, // Reducir el espacio entre el texto y el calendario
    marginTop: 20, // Ajustar el margen superior para centrar mejor
  },
  lunarPhaseText: {
    color: 'white',
    fontSize: 16, // Disminuir el tamaño de la fuente
    fontWeight: 'bold',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
  },
  calendarStrip: {
    height: 180, // Ajustar la altura del calendario
    paddingTop: 10,
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