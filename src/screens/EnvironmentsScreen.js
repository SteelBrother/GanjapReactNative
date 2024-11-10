import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function EnvironmentsScreen() {
  const environments = [
    {
      id: '1',
      title: 'Interior',
      description: '¿Estás cultivando en interiores? Cree un "ambiente interior" y establezca el tamaño de su ambiente, sus luces y tiempo de exposición.',
      iconName: 'plant-pot', // Ajusta el nombre de ícono según el paquete que uses
      buttonText: 'CREAR INTERIOR',
    },
    {
      id: '2',
      title: 'Exterior',
      description: '¿Estás cultivando al aire libre? Crea un "Ambiente Exterior" y registra cuántas horas de luz solar reciben tus plantas.',
      iconName: 'tree-outline', // Ajusta el nombre de ícono según el paquete que uses
      buttonText: 'CREAR EXTERIOR',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {environments.map((environment) => (
        <View key={environment.id} style={styles.card}>
          <Icon name={environment.iconName} type="material-community" color="#A3D77F" size={40} />
          <Text style={styles.title}>{environment.title}</Text>
          <Text style={styles.description}>{environment.description}</Text>
          <Button
            title={environment.buttonText}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => console.log(`Creando ${environment.title}`)}
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
