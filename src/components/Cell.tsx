import { useState } from 'react';
import { getInputType } from '../helpers/input.ts';
import { DataValueType } from '../types';

type CellProps = {
	id: string,
    fieldName: string,
    value: DataValueType,
    handleChange: (key: string, value: DataValueType) => void
}

function Cell({
	id, fieldName, value, handleChange,
}: CellProps) {
	const [controlledValue, setControlledValue] = useState<DataValueType>(value);

	switch (getInputType(fieldName, value)) {
	case 'ignore':
		return null;
	case 'id':
		return (<input className="w-full" type="text" name="id-input" value={controlledValue as string} disabled />);
	case 'radio':
		return (
			<div className="flex flex-row w-full">
				<label htmlFor={`${id}-true-input`}>
					<input
						name={`true-input-${id}`}
						id={`${id}-true-input`}
						className="mr-1"
						value="true"
						type="radio"
						checked={controlledValue === true}
						onChange={() => {
							setControlledValue(true);
							handleChange(fieldName, true);
						}}
					/>
					{' '}
					True
				</label>
				<label className="ml-2" htmlFor={`${id}-false-input`}>
					<input
						name={`false-input-${id}`}
						id={`${id}-false-input`}
						className="mr-1"
						value="false"
						type="radio"
						checked={controlledValue === false}
						onChange={() => {
							setControlledValue(false);
							handleChange(fieldName, false);
						}}
					/>
					{' '}
					False
				</label>
			</div>
		);
	case 'text':
		return (
			<input
				className="border p-1 w-full"
				type="text"
				value={controlledValue as string}
				onChange={(e) => {
					setControlledValue(e.target.value);
					handleChange(fieldName, e.target.value);
				}}
			/>
		);
	case 'number':
		return (
			<input
				className="border p-1 w-full"
				type="number"
				value={controlledValue as number}
				onChange={(e) => {
					setControlledValue(Number(e.target.value));
					handleChange(fieldName, Number(e.target.value));
				}}
			/>
		);
	case 'email':
		return (
			<input
				className="border p-1 w-full"
				type="email"
				value={controlledValue as string}
				onChange={(e) => {
					setControlledValue(e.target.value);
					handleChange(fieldName, e.target.value);
				}}
			/>
		);
	case 'textarea':
		return (
			<textarea
				className="border p-1 w-full"
				value={controlledValue as string}
				onChange={(e) => {
					setControlledValue(e.target.value);
					handleChange(fieldName, e.target.value);
				}}
			/>
		);
	case 'date':
		return (
			<input
				className="border p-1"
				type="date"
				value={(controlledValue as string).split(' ')[0].split('T')[0]}
				onChange={(e) => {
					setControlledValue(e.target.value);
					handleChange(fieldName, e.target.value);
				}}
			/>
		);
	default:
		return <span>{value}</span>;
	}
}

export default Cell;
