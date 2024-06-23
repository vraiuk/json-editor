import { DataValueType } from '../types';

export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const isValidDateString = (dateString: string): boolean => {
	const dateOrTimestampRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2} [+-]\d{2}:\d{2})?$/;
	return dateOrTimestampRegex.test(dateString);
};

export const isPrimitive = (value: unknown): boolean => {
	const type = typeof value;
	if (type === 'string' || type === 'number' || type === 'boolean') {
		return true;
	}

	return false;
};

export const getInputType = (fieldName: string, value: DataValueType): string => {
	if (!isPrimitive(value)) return 'ignore';
	if (fieldName === 'id') return 'id';
	switch (typeof value) {
	case 'boolean':
		return 'radio';
	case 'number':
		return 'number';
	case 'string':
		if (value.length > 50) return 'textarea';
		if (isValidEmail(value)) return 'email';
		if (isValidDateString(value)) return 'date';
		return 'text';
	default:
		return 'text';
	}
};
