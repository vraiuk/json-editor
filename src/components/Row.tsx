import React, { useState } from 'react';
import { DataValueType, DataType, DataKeyType } from '../types';
import Cell from './Cell.tsx';

interface JSONRowProps {
    rowData: DataType;
	onUpdate: (id: string, key: DataKeyType, value: DataValueType) => void;
}

function Row({ rowData, onUpdate }: JSONRowProps) {
	const [editedData, setEditedData] = useState(rowData);
	const handleChange = (key: DataKeyType, value: DataValueType) => {
		setEditedData(prevData => ({
			...prevData,
			[key]: value,
		}));
		onUpdate(editedData.id, key, value);
	};

	return (
		<tr className="border-b flex gap-1">
			{Object.entries(editedData).map(([key, value]: [key: string, value: DataValueType]) => (
				<td className="p-2 table-cell flex-none w-44" key={key}>
					<Cell key={key} id={editedData.id} fieldName={key} value={value} handleChange={handleChange} />
				</td>
			))}
		</tr>
	);
}

export const MemoRow = React.memo(Row);
export default Row;
