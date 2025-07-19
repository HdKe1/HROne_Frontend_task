const generateId = (): string => Math.random().toString(36).substr(2, 9);

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