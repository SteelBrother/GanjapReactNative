import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function PlantsScreen() {
  const stages = [
    {
      id: '1',
      title: 'Germinación',
      description: 'De semilla a plántula. Primero, la semilla se abre y muestra una raíz principal blanca. Entonces, aparece el primer par de pequeñas hojas redondas llamadas "cotiledones".',
      iconName: 'seed-outline',
      buttonText: 'Crear',
    },
    {
      id: '2',
      title: 'Plántula',
      description: 'Cuando se abre la semilla de marihuana, el primer par de pequeñas hojas redondas que aparecen se llaman “cotiledones”. A medida que la planta crece, comienzan a desarrollarse nuevas hojas con más folíolos.',
      iconName: 'leaf-outline',
      buttonText: 'Crear',
    },
    {
      id: '3',
      title: 'Vegetativo',
      description: 'Después de desarrollar el segundo conjunto de hojas, la planta entra en la etapa vegetativa. Por ahora, la planta solo produce tallos y hojas (no tiene flores).',
      iconName: 'tree-outline',
      buttonText: 'Crear',
    },
    {
      id: '4',
      title: 'Floración',
      description: 'La etapa de floración es el período en el que las plantas desarrollan sus flores. Primero, verá las preflores femeninas, pares de pelos blancos que salen de un cáliz verde de punta redonda.',
      iconName: 'flower-outline',
      buttonText: 'Crear',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {stages.map((stage) => (
        <View key={stage.id} style={styles.card}>
          <Icon name={stage.iconName} type="material-community" color="#A3D77F" size={40} />
          <Text style={styles.title}>{stage.title}</Text>
          <Text style={styles.description}>{stage.description}</Text>
          <Button
            title={stage.buttonText}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log(`Creando ${stage.title}`)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#A3D77F',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
