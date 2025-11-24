import React, { createContext, useState, useCallback } from "react";
import styled from "styled-components";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Toast type={notification.type} role="alert" aria-live="assertive">
          {notification.message}
        </Toast>
      )}
    </NotificationContext.Provider>
  );
}

const Toast = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ type, theme }) =>
    type === "success" ? theme.colors.success : theme.colors.error};
  border: 1px solid
    ${({ type, theme }) =>
      type === "success" ? theme.colors.success : theme.colors.error};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.3s ease;
`;
