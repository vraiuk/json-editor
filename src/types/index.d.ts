export type DataValueType = string | boolean | number
export type DataKeyType = string | 'id'
export type DataType = Record<string, DataValueType> & { id: string };
