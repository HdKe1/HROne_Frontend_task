export interface SchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  required: boolean;
  children?: SchemaField[];
}
