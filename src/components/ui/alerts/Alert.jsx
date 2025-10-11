import React from 'react';
import {
  MdWarning,
  MdError,
  MdInfo,
  MdCheckCircle,
  MdSecurity,
  MdNotifications
} from 'react-icons/md';

const Alert = ({
  type = 'info',
  title,
  message,
  actionText,
  onActionClick,
  children,
  className = '',
  dismissible = false,
  onDismiss,
  icon: customIcon
}) => {
  // Configuraciones por tipo de alerta
  const alertConfigs = {
    success: {
      containerClass: 'bg-green-50 border-green-200',
      iconClass: 'text-green-600',
      titleClass: 'text-green-800',
      messageClass: 'text-green-700',
      actionClass: 'text-green-800 hover:text-green-900',
      icon: MdCheckCircle
    },
    error: {
      containerClass: 'bg-red-50 border-red-200',
      iconClass: 'text-red-600',
      titleClass: 'text-red-800',
      messageClass: 'text-red-700',
      actionClass: 'text-red-800 hover:text-red-900',
      icon: MdError
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200',
      iconClass: 'text-yellow-600',
      titleClass: 'text-yellow-800',
      messageClass: 'text-yellow-700',
      actionClass: 'text-yellow-800 hover:text-yellow-900',
      icon: MdWarning
    },
    info: {
      containerClass: 'bg-blue-50 border-blue-200',
      iconClass: 'text-blue-600',
      titleClass: 'text-blue-800',
      messageClass: 'text-blue-700',
      actionClass: 'text-blue-800 hover:text-blue-900',
      icon: MdInfo
    },
    security: {
      containerClass: 'bg-red-50 border-red-200',
      iconClass: 'text-red-600',
      titleClass: 'text-red-800',
      messageClass: 'text-red-700',
      actionClass: 'text-red-800 hover:text-red-900',
      icon: MdSecurity
    },
    notification: {
      containerClass: 'bg-purple-50 border-purple-200',
      iconClass: 'text-purple-600',
      titleClass: 'text-purple-800',
      messageClass: 'text-purple-700',
      actionClass: 'text-purple-800 hover:text-purple-900',
      icon: MdNotifications
    }
  };

  const config = alertConfigs[type] || alertConfigs.info;
  const IconComponent = customIcon || config.icon;

  return (
    <div className={`border rounded-lg p-4 ${config.containerClass} ${className}`}>
      <div className="flex items-start gap-3">
        <IconComponent className={`h-5 w-5 ${config.iconClass} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-medium ${config.titleClass}`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${config.messageClass} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          )}
          {children && (
            <div className={`${title || message ? 'mt-2' : ''}`}>
              {children}
            </div>
          )}
          {actionText && onActionClick && (
            <button
              onClick={onActionClick}
              className={`text-sm ${config.actionClass} underline hover:no-underline mt-2 block transition-colors`}
            >
              {actionText}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`${config.iconClass} hover:opacity-75 transition-opacity ml-2`}
            aria-label="Cerrar alerta"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;