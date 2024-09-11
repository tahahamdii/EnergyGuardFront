import React, { useState } from 'react';
import { sendNotification } from '../../Services/notifService';

const NotificationComponent = () => {
    const [deviceToken, setDeviceToken] = useState('');
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [message, setMessage] = useState('');

    const handleSendNotification = async () => {
        if (!deviceToken.trim() || !notification.title.trim() || !notification.body.trim()) {
            setMessage('Please fill in all fields.');
            return;
        }

        try {
            await sendNotification(deviceToken, notification);
            setMessage('Notification sent successfully.');
        } catch (error) {
            setMessage('Failed to send notification. Please try again.');
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <div>
                <label htmlFor="deviceToken">Device Token:</label>
                <input
                    type="text"
                    id="deviceToken"
                    value={deviceToken}
                    onChange={(e) => setDeviceToken(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={notification.title}
                    onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <input
                    type="text"
                    id="body"
                    value={notification.body}
                    onChange={(e) => setNotification({ ...notification, body: e.target.value })}
                />
            </div>
            <button onClick={handleSendNotification}>Send Notification</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NotificationComponent;
