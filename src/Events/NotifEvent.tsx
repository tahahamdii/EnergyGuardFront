import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotifEvent = () => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    try {
      const socket = io('http://localhost:5000/event/addEvent', {
       
      });

      socket.on('notification', (data) => {
        setNotification(data);
      });
  
      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error('An error occurred while connecting to the socket:', error);
    }
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
    </div>
  );
};

export default NotifEvent;
