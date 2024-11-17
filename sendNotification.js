const fetch = require('node-fetch');

async function sendPushNotification(token, title, body) {
  const message = {
    to: token,
    sound: 'default',
    title: title,
    body: body,
    data: { extraData: 'Algunos datos extra' },
  };

  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  const result = await response.json();
  console.log('Resultado del envío:', result);
}

// Reemplaza con tu token de dispositivo y el mensaje
sendPushNotification('ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]', 'Hola!', 'Esto es una notificación de prueba');
