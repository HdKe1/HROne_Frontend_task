import React, { useCallback } from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { SchemaField } from '@/types/schema';
import { generateId } from '@/utils/utils';
import { CustomSwitch } from '../ui/CustomSwitch';

interface FieldRowProps {
  field: SchemaField;
  index: number;
  onUpdate: (index: number, field: SchemaField) => void;
  onDelete: (index: number) => void;
  onAddNested: (index: number) => void;
  level?: number;
}

export const FieldRow: React.FC<FieldRowProps> = ({ 
  field, 
  index, 
  onUpdate, 
  onDelete, 
  onAddNested, 
  level = 0 
}) => {
  const handleFieldChange = useCallback((key: keyof SchemaField, value: any) => {
    const updatedField = { ...field, [key]: value };
    if (key === 'type' && value !== 'nested') {
      delete updatedField.children;
    }
    onUpdate(index, updatedField);
  }, [field, index, onUpdate]);

  const handleNestedFieldUpdate = useCallback((nestedIndex: number, nestedField: SchemaField) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren[nestedIndex] = nestedField;
    onUpdate(index, { ...field, children: updatedChildren });
  }, [field, index, onUpdate]);

  const handleNestedFieldDelete = useCallback((nestedIndex: number) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren.splice(nestedIndex, 1);
    onUpdate(index, { ...field, children: updatedChildren });
  }, [field, index, onUpdate]);

  const handleAddNestedField = useCallback((nestedIndex: number) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren.splice(nestedIndex + 1, 0, {
      id: generateId(),
      name: `field${updatedChildren.length + 1}`,
      type: 'string',
      required: false
    });
    onUpdate(index, { ...field, children: updatedChildren });
  }, [field, index, onUpdate]);

  const addNestedField = useCallback(() => {
    const newChildren = field.children || [];
    newChildren.push({
      id: generateId(),
      name: `field${newChildren.length + 1}`,
      type: 'string',
      required: false
    });
    onUpdate(index, { ...field, children: newChildren });
  }, [field, index, onUpdate]);

  return (
    <div className={`space-y-2 ${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border">
        <div className="flex-1">
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Field name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="w-32">
          <select
            value={field.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="nested">nested</option>
          </select>
        </div>
        
        <CustomSwitch
          checked={field.required}
          onChange={(required) => handleFieldChange('required', required)}
          label="Required"
        />
        
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {field.type === 'nested' && (
        <div className="space-y-2">
          {field.children?.map((childField, childIndex) => (
            <FieldRow
              key={childField.id}
              field={childField}
              index={childIndex}
              onUpdate={handleNestedFieldUpdate}
              onDelete={handleNestedFieldDelete}
              onAddNested={handleAddNestedField}
              level={level + 1}
            />
          ))}
          <button
            onClick={addNestedField}
            className="ml-4 px-3 py-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-md text-sm transition-colors flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add nested field
          </button>
        </div>
      )}
    </div>
  );
};