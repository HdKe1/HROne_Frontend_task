import React, { useCallback } from 'react';
import { Plus } from 'lucide-react';
import type { SchemaField } from '@/types/schema';
import { FieldRow } from './FieldRow';

interface SchemaBuilderProps {
  fields: SchemaField[];
  onUpdateField: (index: number, field: SchemaField) => void;
  onDeleteField: (index: number) => void;
  onAddField: () => void;
  onClearAll: () => void;
}

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ 
  fields, 
  onUpdateField, 
  onDeleteField, 
  onAddField, 
  onClearAll 
}) => {
  const addNestedField = useCallback((index: number) => {
    // This function is handled within individual field rows
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Schema Fields</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            field={field}
            index={index}
            onUpdate={onUpdateField}
            onDelete={onDeleteField}
            onAddNested={addNestedField}
          />
        ))}
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          onClick={onAddField}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Field
        </button>
        <button
          onClick={onClearAll}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};