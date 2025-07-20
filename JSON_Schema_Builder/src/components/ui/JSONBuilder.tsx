import React from 'react';
import { useSchemaBuilder } from '../../hooks/useSchemaBuilder';
import { SchemaBuilder } from './SchemaBuilder';
import { JsonPreview } from './JSONPreview';
const JsonSchemaBuilder: React.FC = () => {
  const {
    fields,
    jsonPreview,
    updateField,
    deleteField,
    addField,
    clearAllFields
  } = useSchemaBuilder();

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
            <SchemaBuilder
              fields={fields}
              onUpdateField={updateField}
              onDeleteField={deleteField}
              onAddField={addField}
              onClearAll={clearAllFields}
            />
            
            {/* JSON Preview Section */}
            <JsonPreview jsonPreview={jsonPreview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonSchemaBuilder;