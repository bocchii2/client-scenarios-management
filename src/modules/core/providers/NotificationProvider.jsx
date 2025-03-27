import { useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import SimpleNotification from "../../../components/ui/Notification/SimpleNotification";

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const [isOpen, setIsOpen] = useState(false);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setIsOpen(true);
    // the notification component has a its own timer
    /*     setTimeout(() => {
      setIsOpen(false);
    }, 3000); */
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <SimpleNotification
          message={notification.message}
          type={notification.type}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </NotificationContext.Provider>
  );
};
