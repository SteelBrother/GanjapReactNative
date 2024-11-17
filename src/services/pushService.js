import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuración del canal de notificaciones para Android
async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

// Función para registrar el dispositivo y obtener el token
export async function registerForPushNotificationsAsync() {
  await setupNotificationChannel();

  // Solicitar permisos para recibir notificaciones
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications required!');
    return;
  }

  // Obtener el token de notificación push
  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token); // Guarda el token en tu backend o base de datos
  return token;
}

// Función para enviar notificaciones
export async function sendPushNotification(expoPushToken, message) {
  const messagePayload = {
    to: expoPushToken,
    sound: 'default',
    title: message.title,
    body: message.body,
    data: { data: message.data },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });
}