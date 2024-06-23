export type DataValueType = string | boolean | number
export type DataKeyType = string | 'id'
export type DataType = Record<string, DataValueType> & { id: string };

export type JSONDataTypeNew = {
    ['id']: string, isActive: boolean;
    ['picture']: string;
    ['age']: number;
    ['name']: string;
    ['email']: string;
    ['address']: string;
    ['about']: string;
    ['registered']: string;
}
