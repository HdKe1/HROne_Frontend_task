import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface SchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  required: boolean;
  children?: SchemaField[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const getDefaultValue = (type: string) => {
  switch (type) {
    case 'string':
      return 'STRING';
    case 'number':
      return 'NUMBER';
    case 'nested':
      return {};
    default:
      return '';
  }
};

const buildJsonSchema = (fields: SchemaField[]): any => {
  const schema: any = {};
  
  fields.forEach(field => {
    if (field.type === 'nested' && field.children) {
      schema[field.name] = buildJsonSchema(field.children);
    } else {
      schema[field.name] = getDefaultValue(field.type);
    }
  });
  
  return schema;
};

const FieldRow: React.FC<{
  field: SchemaField;
  index: number;
  onUpdate: (index: number, field: SchemaField) => void;
  onDelete: (index: number) => void;
  onAddNested: (index: number) => void;
  level?: number;
}> = ({ field, index, onUpdate, onDelete, onAddNested, level = 0 }) => {
  const handleFieldChange = (key: keyof SchemaField, value: any) => {
    const updatedField = { ...field, [key]: value };
    if (key === 'type' && value !== 'nested') {
      delete updatedField.children;
    }
    onUpdate(index, updatedField);
  };

  const handleNestedFieldUpdate = (nestedIndex: number, nestedField: SchemaField) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren[nestedIndex] = nestedField;
    onUpdate(index, { ...field, children: updatedChildren });
  };

  const handleNestedFieldDelete = (nestedIndex: number) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren.splice(nestedIndex, 1);
    onUpdate(index, { ...field, children: updatedChildren });
  };

  const handleAddNestedField = (nestedIndex: number) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren.splice(nestedIndex + 1, 0, {
      id: generateId(),
      name: `field${updatedChildren.length + 1}`,
      type: 'string',
      required: false
    });
    onUpdate(index, { ...field, children: updatedChildren });
  };

  const addNestedField = () => {
    const newChildren = field.children || [];
    newChildren.push({
      id: generateId(),
      name: `field${newChildren.length + 1}`,
      type: 'string',
      required: false
    });
    onUpdate(index, { ...field, children: newChildren });
  };

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
        
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleFieldChange('required', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer ${field.required ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${field.required ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
            </div>
          </label>
          <span className="text-sm text-gray-700">Required</span>
        </div>
        
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

export default function JsonSchemaBuilder() {
  const [fields, setFields] = useState<SchemaField[]>([
    {
      id: generateId(),
      name: 'name',
      type: 'string',
      required: false
    },
    {
      id: generateId(),
      name: 'class',
      type: 'number',
      required: false
    },
    {
      id: generateId(),
      name: 'address',
      type: 'nested',
      required: false,
      children: []
    }
  ]);

  const [jsonPreview, setJsonPreview] = useState<string>('');

  useEffect(() => {
    const schema = buildJsonSchema(fields);
    setJsonPreview(JSON.stringify(schema, null, 2));
  }, [fields]);

  const updateField = (index: number, field: SchemaField) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    setFields(updatedFields);
  };

  const deleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const addField = () => {
    const newField: SchemaField = {
      id: generateId(),
      name: `field${fields.length + 1}`,
      type: 'string',
      required: false
    };
    setFields([...fields, newField]);
  };

  const addNestedField = (index: number) => {
    // This function is handled within individual field rows
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">JSON Schema Builder</h1>
        </div>
        
        <div className="p-6">
          {/* Side by Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schema Builder Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Schema Fields</h2>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <FieldRow
                    key={field.id}
                    field={field}
                    index={index}
                    onUpdate={updateField}
                    onDelete={deleteField}
                    onAddNested={addNestedField}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={addField}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Add Field
                </button>
                <button
                  onClick={() => setFields([])}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            {/* JSON Preview Section */}
            <div className="bg-white rounded-lg border">
              <div className="px-4 py-3 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">JSON Preview</h3>
              </div>
              <div className="p-4">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm font-mono h-96 lg:h-[500px]">
                  <code>{jsonPreview}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}