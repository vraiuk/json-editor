import { useState } from 'react';
import { JSONDataType } from '../types';

interface JSONRowProps {
    data: JSONDataType;
}

const selectInputType = (key: string, value: unknown) => {
	switch (key) {
	case 'id':
		return (<>'text'</>);
	case 'isActive':
		return (<>'boolean'</>);
	case 'picture':
		return (<>'text'</>);
	case 'age':
		return (<>'number'</>);
	case 'name':
		return (<>'text'</>);
	case 'email':
		return (<>'email'</>);
	case 'address':
		return (<>'text'</>);
	case 'about':
		return (<>'textarea'</>);
	case 'registered':
		return (<>'date'</>);
	default:
		return (<></>);
	}
	console.log('-------------');
	// If the value is a string, it will create an input field with type text.
	// 	If the value is a number, it will create an input field with a number as a type.
	// 	If the value is email, it will create an input field with email as type.
	// 	If the value is a date, it will use a html date picker.
	// 	If the value is boolean, it will use a radio button with “true/false”.
	// If the field value is a long text, use the textarea field.
	// id: string;
	// isActive: boolean;
	// picture: string;
	// age: number;
	// name: string;
	// email: string;
	// address: string;
	// about: string;
};

function JSONRow({ data }: JSONRowProps) {
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState(data);

	// Function to toggle edit mode
	const toggleEditMode = () => setEditMode(!editMode);

	// Function to handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			name, value, type, checked,
		} = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	return (
		<div className="p-2 border-b">
			{Object.entries(formData).map(([key, value]) => (
				<div key={key} className="flex items-center space-x-2">
					<span>
						{key}
						:
					</span>
					{
						!editMode ? (
							<span>{String(value)}</span>
						) : selectInputType(key, value)
					}
				</div>
			))}
			<button type="button" onClick={toggleEditMode}>
				{editMode ? 'Save' : 'Edit'}
			</button>
		</div>
	);
}

export default JSONRow;
