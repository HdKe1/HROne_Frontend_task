import React from 'react';

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({ 
  checked, 
  onChange, 
  label 
}) => (
  <div className="flex items-center space-x-2">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer ${checked ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
      </div>
    </label>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);