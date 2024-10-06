import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    paddingHorizontal: 20, // Añade un padding horizontal
  },
  input: {
    marginBottom: 15, // Espaciado entre inputs
    width: '100%', // Asegúrate de que el ancho sea del 100% de su contenedor
  },
  icon: {
    color: '#000', // Color del ícono
  },
  btnContainer: {
    marginTop: 20,
    width: '100%', // Asegúrate de que el botón también ocupe el 100% del ancho
  },
  btn: {
    backgroundColor: '#007bff', // Color del botón
  },
});
