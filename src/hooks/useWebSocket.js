import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useStore } from '../store/useStore';
import { API_URL } from '../config';

export function useWebSocket(groupId, onPaymentEvent) {
  const clientRef = useRef(null);
  const token = useStore(s => s.token);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3000,   // auto-reconnect every 3s on drop

      onConnect: () => {
        client.subscribe(`/topic/group/${groupId}`, msg => {
          const event = JSON.parse(msg.body);
          onPaymentEvent(event); // caller updates UI
        });
      },
      onStompError: frame => {
        console.error('WebSocket error', frame);
      }
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate(); // cleanup on unmount
  }, [groupId, token]);

  return clientRef; // expose to check isActive
}
