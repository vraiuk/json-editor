import {
	Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { DataType } from '../types';

export function Filter({ data, setData }: { data: DataType[], setData: Dispatch<SetStateAction<DataType[]>> }) {
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setData(data.filter(rowValue => (
			Object.values(rowValue).some(value => value.toString().includes(filterValue))
		)));
	}, [data, filterValue, setData]);

	return (
		<div className="flex items-center my-4">
			<span className="mr-2 font-semibold text-gray-700">Filter items:</span>
			<input
				type="text"
				name="id-input"
				value={filterValue}
				onChange={(e) => {
					setFilterValue(e.target.value);
				}}
				className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
				placeholder="Enter filter text"
			/>
		</div>
	);
}
