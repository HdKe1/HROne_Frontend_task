import { useState, useEffect, useCallback } from 'react';
import { SchemaField } from '@/types/schema';
import { generateId,buildJsonSchema } from '@/utils/utils';

export const useSchemaBuilder = () => {
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

  const updateField = useCallback((index: number, field: SchemaField) => {
    setFields(prev => {
      const updatedFields = [...prev];
      updatedFields[index] = field;
      return updatedFields;
    });
  }, []);

  const deleteField = useCallback((index: number) => {
    setFields(prev => {
      const updatedFields = [...prev];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  }, []);

  const addField = useCallback(() => {
    setFields(prev => {
      const newField: SchemaField = {
        id: generateId(),
        name: `field${prev.length + 1}`,
        type: 'string',
        required: false
      };
      return [...prev, newField];
    });
  }, []);

  const clearAllFields = useCallback(() => {
    setFields([]);
  }, []);

  return {
    fields,
    jsonPreview,
    updateField,
    deleteField,
    addField,
    clearAllFields
  };
};