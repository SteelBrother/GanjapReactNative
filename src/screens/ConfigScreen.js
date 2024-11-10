import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ConfigScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Configuraciones</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Comunidad y ayuda de cultivo</Text>
        <TouchableOpacity style={styles.item}>
          <Icon name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.itemText}>Únete a la Comunidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="logo-discord" size={24} color="black" />
          <Text style={styles.itemText}>Servidor de Discord de la comunidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="mail-outline" size={24} color="black" />
          <Text style={styles.itemText}>Soporte al cultivador</Text>
          <View style={styles.proBadge}><Text style={styles.proText}>PRO</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="book-outline" size={24} color="black" />
          <Text style={styles.itemText}>Guías de cultivo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Mi configuración de cultivo</Text>
        <TouchableOpacity style={styles.item}>
          <Icon name="folder-outline" size={24} color="black" />
          <Text style={styles.itemText}>Archivo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="flask-outline" size={24} color="black" />
          <Text style={styles.itemText}>Mis mezclas de nutrientes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Más</Text>
        <TouchableOpacity style={styles.item}>
          <Icon name="chatbubble-ellipses-outline" size={24} color="black" />
          <Text style={styles.itemText}>Contáctanos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="help-circle-outline" size={24} color="black" />
          <Text style={styles.itemText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="book-outline" size={24} color="black" />
          <Text style={styles.itemText}>Base de conocimientos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="star-outline" size={24} color="black" />
          <Text style={styles.itemText}>Evaluar GanjApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="information-circle-outline" size={24} color="black" />
          <Text style={styles.itemText}>Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="information-circle-outline" size={24} color="black" />
          <Text style={styles.itemText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo claro
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#2a9d8f', // Verde más oscuro para resaltar
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333', // Texto oscuro
    marginLeft: 10,
  },
  proBadge: {
    backgroundColor: '#2a9d8f', // Verde más oscuro para buen contraste
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 10,
  },
  proText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
