import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Línea de color personalizado
      strokeWidth: 2, // Ancho de línea
    },
  ],
  legend: ["Rainfall"], // Leyenda opcional
};

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // Redondeo de decimales
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const LineChartExample = () => (
  <View>
    <LineChart
      data={chartData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      bezier
    />
  </View>
);

export default LineChartExample;
