import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore } from '../utils/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

export default function ActionCaptureScreen() {
  const navigation = useNavigation();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plants, setPlants] = useState([]);
  const [openPlantDropdown, setOpenPlantDropdown] = useState(false);
  const [action, setAction] = useState(null);
  const [openActionDropdown, setOpenActionDropdown] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [repeatDaily, setRepeatDaily] = useState(false);
  const [notification, setNotification] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        if (currentUser) {
          const q = query(collection(firestore, 'plants'), where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const plantsList = querySnapshot.docs.map((doc) => ({
            label: doc.data().name || 'Planta sin nombre',
            value: doc.id,
          }));
          setPlants(plantsList);
        }
      } catch (error) {
        console.error('Error al cargar plantas:', error);
      }
    };
    fetchPlants();
  }, []);
  

  const handleSave = async () => {
    try {
      await addDoc(collection(firestore, 'actions'), {
        selectedPlant,
        action,
        date,
        description,
        amount,
        repeatDaily,
        notification,
      });
      alert('Acción guardada exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar la acción:', error);
    }
  };

  // Opciones de acción basadas en la imagen proporcionada
  const actionOptions = [
    { label: 'Regado', value: 'Regado', icon: () => <MaterialCommunityIcons name="water" size={20} color="#00BFFF" /> },
    { label: 'Nutrientes', value: 'Nutrientes', icon: () => <MaterialCommunityIcons name="sprout" size={20} color="#32CD32" /> },
    { label: 'Repelente', value: 'Repelente', icon: () => <MaterialCommunityIcons name="bug" size={20} color="#FF4500" /> },
    { label: 'Trasplante', value: 'Trasplante', icon: () => <MaterialCommunityIcons name="shovel" size={20} color="#8B4513" /> },
    { label: 'Poda', value: 'Poda', icon: () => <MaterialCommunityIcons name="scissors-cutting" size={20} color="#808080" /> },
    { label: 'Entrenamiento', value: 'Entrenamiento', icon: () => <MaterialCommunityIcons name="arm-flex" size={20} color="#4682B4" /> },
    { label: 'Cambiar Ambiente', value: 'Cambiar Ambiente', icon: () => <MaterialCommunityIcons name="home-switch" size={20} color="#FFD700" /> },
    { label: 'Lavado de raíces', value: 'Lavado de raíces', icon: () => <MaterialCommunityIcons name="shower" size={20} color="#1E90FF" /> },
    { label: 'Cosechar', value: 'Cosechar', icon: () => <MaterialCommunityIcons name="fruit-grapes" size={20} color="#DA70D6" /> },
    { label: 'Declarar Muerte', value: 'Declarar Muerte', icon: () => <MaterialCommunityIcons name="skull" size={20} color="#A9A9A9" /> },
    { label: 'Otro', value: 'Otro', icon: () => <MaterialCommunityIcons name="dots-horizontal" size={20} color="#FFFFFF" /> },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Nueva Acción</Text>

      {/* Dropdown para seleccionar la planta */}
      <DropDownPicker
      items={plants}
      placeholder="Seleccionar plantas o ambientes"
      open={openPlantDropdown}
      value={selectedPlant}
      setValue={setSelectedPlant}
      setOpen={setOpenPlantDropdown}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      textStyle={{ color: '#fff' }}
      zIndex={3000}
      zIndexInverse={1000}
      />


      {/* Dropdown para seleccionar la acción */}
      <DropDownPicker
        items={actionOptions}
        placeholder="Seleccionar acción"
        open={openActionDropdown}
        value={action}
        setValue={setAction}
        setOpen={setOpenActionDropdown}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={2000}
        zIndexInverse={1000}
        textStyle={{ color: '#fff' }}
      />

      <Text style={styles.label}>Fecha</Text>
      <TextInput value={date} onChangeText={setDate} style={styles.input} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Opciones de Regado</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Cantidad"
          value={amount}
          onChangeText={setAmount}
          style={[styles.input, { flex: 1 }]}
          keyboardType="numeric"
        />
        <Text style={styles.unit}>ml</Text>
      </View>

      <Text style={styles.label}>Recurrencia</Text>
      <View style={styles.optionContainer}>
        <Text>Repetir cada día</Text>
        <Switch value={repeatDaily} onValueChange={setRepeatDaily} />
      </View>
      <View style={styles.optionContainer}>
        <Text>Agregar una notificación</Text>
        <Switch value={notification} onValueChange={setNotification} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  closeButton: {
    color: '#A3D77F',
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
    color: '#A3D77F',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#333',
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: '#333',
  },
  label: {
    color: '#A3D77F',
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    color: '#fff',
    marginLeft: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#A3D77F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
});
