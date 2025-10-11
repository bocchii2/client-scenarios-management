import React from "react";

const MetricCard = ({
  title,
  value,
  icon: Icon,
  bgColor = "bg-gray-500",
  textColor = "text-gray-600",
  bgLight = "bg-gray-50",
  subtitle,
  className = ""
}) => (
  <div className={`${bgLight} rounded-lg p-4 sm:p-6 border-gray-200 ${className} w-full`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl sm:text-3xl font-bold ${textColor} mt-2`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {Icon && (
        <div className={`${bgColor} p-3 rounded-full flex-shrink-0`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      )}
    </div>
  </div>
);

export default MetricCard;