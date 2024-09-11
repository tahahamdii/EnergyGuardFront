import baseUrl from "../enviroment/enviroment"
async function sendNotification(deviceToken: string, notification: { title: string, body: string }) {
    const apiUrl = `${baseUrl.baseUrl}/send-notification`;
  
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deviceToken, notification }),
        });
      
        if (!response.ok) {
            throw new Error('Failed to send notification');
        } 
        console.log('Notification sent successfully.');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

export { sendNotification };
