import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface ErrorNotificationProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function ErrorNotification({ notifications, onDismiss }: ErrorNotificationProps) {
  if (notifications.length === 0) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-900/20 border-red-500/30';
      case 'success':
        return 'bg-green-900/20 border-green-500/30';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-500/30';
      case 'info':
        return 'bg-blue-900/20 border-blue-500/30';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} border rounded-lg p-4 max-w-sm shadow-lg backdrop-blur-sm`}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-300">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="p-1 hover:bg-gray-800/50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook to manage notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep max 5 notifications

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
  };
}

// Global notification manager
export class NotificationManager {
  private static instance: NotificationManager;
  private listeners: Set<(notification: Notification) => void> = new Set();

  private constructor() {
    // Listen for custom events
    if (typeof window !== 'undefined') {
      window.addEventListener('showError', ((event: CustomEvent) => {
        this.addNotification({
          type: 'error',
          title: event.detail.title || 'Error',
          message: event.detail.message,
        });
      }) as EventListener);

      window.addEventListener('showNotification', ((event: CustomEvent) => {
        this.addNotification({
          type: event.detail.type || 'info',
          title: event.detail.title || 'Notification',
          message: event.detail.message,
        });
      }) as EventListener);

      window.addEventListener('logError', ((event: CustomEvent) => {
        this.addNotification({
          type: 'error',
          title: 'System Error',
          message: event.detail.error || 'An error occurred',
        });
      }) as EventListener);
    }
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    this.listeners.forEach(listener => listener(newNotification));
  }

  subscribe(listener: (notification: Notification) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const notificationManager = NotificationManager.getInstance(); 