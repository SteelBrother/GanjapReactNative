import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español

// Configura moment para usar español
moment.locale('es');

const Calendar = ({ onSelectDate, selected }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    // Esto asegura que la configuración de idioma esté lista
    moment.locale('es');
  }, []);

  return (
    <View style={styles.calendarContainer}>
      <CalendarStrip
        scrollable={true}
        style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: 'blue' }}
        calendarColor={'#fff'}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        highlightDateNumberStyle={{ color: 'red' }}
        highlightDateNameStyle={{ color: 'red' }}
        markedDates={[
          {
            date: moment(),
            dots: [{ color: 'red', selectedColor: 'yellow' }],
          },
        ]}
        onDateSelected={(date) => {
          console.log(`Fecha seleccionada: ${date.format('YYYY-MM-DD')}`);
          if (onSelectDate) {
            onSelectDate(date.format('YYYY-MM-DD'));
          }
        }}
        selectedDate={selected ? moment(selected) : null} // Para reflejar la selección
        startingDate={currentMonth}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendarContainer: {
    width: '100%',
    padding: 20,
  },
});
