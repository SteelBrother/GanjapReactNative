import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Calendar from '../components/shared/Calendar';
import InfoCard from '../components/shared/InfoCard';
import ActionButton from '../components/shared/ActionButton';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [environmentalData, setEnvironmentalData] = useState({});
  const [chartData, setChartData] = useState([0, 0, 0, 0]);

  // Datos de ejemplo
  const dataExample = {
    '2024-10-01': { // Germinación
      temperature: { value: 20, unit: '°C', status: 'optimal' },
      humidity: { value: 70, unit: '%', status: 'optimal' },
      light: { value: 12, unit: 'horas', status: 'optimal' },
      co2: { value: 400, unit: 'ppm', status: 'optimal' },
    },
    '2024-10-02': {
      temperature: { value: 21, unit: '°C', status: 'optimal' },
      humidity: { value: 75, unit: '%', status: 'optimal' },
      light: { value: 12, unit: 'horas', status: 'optimal' },
      co2: { value: 410, unit: 'ppm', status: 'optimal' },
    },
    '2024-10-10': {
      temperature: { value: 22, unit: '°C', status: 'optimal' },
      humidity: { value: 65, unit: '%', status: 'optimal' },
      light: { value: 14, unit: 'horas', status: 'optimal' },
      co2: { value: 420, unit: 'ppm', status: 'optimal' },
    },
    '2024-10-20': { // Etapa vegetativa
      temperature: { value: 24, unit: '°C', status: 'optimal' },
      humidity: { value: 60, unit: '%', status: 'optimal' },
      light: { value: 16, unit: 'horas', status: 'optimal' },
      co2: { value: 430, unit: 'ppm', status: 'optimal' },
    },
    '2024-10-30': {
      temperature: { value: 25, unit: '°C', status: 'optimal' },
      humidity: { value: 55, unit: '%', status: 'optimal' },
      light: { value: 18, unit: 'horas', status: 'optimal' },
      co2: { value: 440, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-01': {
      temperature: { value: 22, unit: '°C', status: 'optimal' },
      humidity: { value: 50, unit: '%', status: 'optimal' },
      light: { value: 8, unit: 'horas', status: 'optimal' },
      co2: { value: 380, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-02': {
      temperature: { value: 24, unit: '°C', status: 'optimal' },
      humidity: { value: 60, unit: '%', status: 'optimal' },
      light: { value: 7, unit: 'horas', status: 'optimal' },
      co2: { value: 400, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-10': { // Etapa de floración
      temperature: { value: 20, unit: '°C', status: 'optimal' },
      humidity: { value: 45, unit: '%', status: 'optimal' },
      light: { value: 12, unit: 'horas', status: 'optimal' },
      co2: { value: 350, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-15': {
      temperature: { value: 21, unit: '°C', status: 'optimal' },
      humidity: { value: 50, unit: '%', status: 'optimal' },
      light: { value: 12, unit: 'horas', status: 'optimal' },
      co2: { value: 360, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-20': {
      temperature: { value: 19, unit: '°C', status: 'optimal' },
      humidity: { value: 55, unit: '%', status: 'optimal' },
      light: { value: 10, unit: 'horas', status: 'optimal' },
      co2: { value: 370, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-25': {
      temperature: { value: 18, unit: '°C', status: 'optimal' },
      humidity: { value: 60, unit: '%', status: 'optimal' },
      light: { value: 10, unit: 'horas', status: 'optimal' },
      co2: { value: 380, unit: 'ppm', status: 'optimal' },
    },
    '2024-11-30': {
      temperature: { value: 17, unit: '°C', status: 'optimal' },
      humidity: { value: 65, unit: '%', status: 'optimal' },
      light: { value: 9, unit: 'horas', status: 'optimal' },
      co2: { value: 390, unit: 'ppm', status: 'optimal' },
    },
    '2024-12-05': { // Cosecha
      temperature: { value: 16, unit: '°C', status: 'optimal' },
      humidity: { value: 70, unit: '%', status: 'optimal' },
      light: { value: 8, unit: 'horas', status: 'optimal' },
      co2: { value: 400, unit: 'ppm', status: 'optimal' },
    },
    '2024-12-10': {
      temperature: { value: 15, unit: '°C', status: 'optimal' },
      humidity: { value: 75, unit: '%', status: 'optimal' },
      light: { value: 8, unit: 'horas', status: 'optimal' },
      co2: { value: 410, unit: 'ppm', status: 'optimal' },
    },
  };

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      const dayData = dataExample[formattedDate] || {};
      setEnvironmentalData(dayData);

      // Actualiza los datos para los gráficos
      const newChartData = [
        dayData.temperature?.value || 0,
        dayData.humidity?.value || 0,
        dayData.light?.value || 0,
        dayData.co2?.value || 0,
      ];

      setChartData(newChartData);
    }
  }, [selectedDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      </View>

      <View style={styles.mainActionsContainer}>
        <ActionButton
          title="Acción"
          iconName="flash"
          onPress={() => navigation.navigate('ActionCapture')}
        />
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

      {/* Sección de gráficos */}
      <Text style={styles.sectionTitle}>GRÁFICOS</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Temperatura', 'Humedad', 'Luz', 'CO₂'],
            datasets: [{ data: chartData }],
          }}
          width={Dimensions.get('window').width - 32} // Ancho del gráfico
          height={220}
          yAxisInterval={1} // Intervalo para el eje Y
          chartConfig={{
            backgroundColor: '#222',
            backgroundGradientFrom: '#333',
            backgroundGradientTo: '#555',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={styles.chart}
        />

         {/* Gráfico de barras */}
      <Text style={styles.sectionTitle}>GRÁFICO DE BARRAS</Text>
      <BarChart
        data={{
          labels: ['Temperatura', 'Humedad', 'Luz', 'CO₂'],
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#222',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#555',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={styles.chart}
      />
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
  chartContainer: {
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
