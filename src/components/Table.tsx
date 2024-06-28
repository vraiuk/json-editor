import { MemoRow } from './Row.tsx';
import { DataValueType, DataType, DataKeyType } from '../types';
import { useCallback, useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface EditorProps {
    data: DataType[];
}

function TableVirtualized({ data }: EditorProps) {
	const [rows, setRows] = useState(() => data);

	const updateRowData = useCallback((id: string, key: DataKeyType, value: DataValueType) => {
		setRows(oldData => (oldData.map(row =>
			(row.id === id ? { ...row, [key]: value } : row))));
	}, [setRows]);

	const parentRef = useRef<HTMLDivElement>(null);

	// actually, we could use useReactTable() here to implement filters
	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 80,
		overscan: 5,
	});
	const items = virtualizer.getVirtualItems();

	return (
		<div
			ref={parentRef}
			style={{
				height: '100vh',
				width: '100vw',
				overflowY: 'auto',
				contain: 'strict',
			}}
		>
			<div
				style={{
					height: virtualizer.getTotalSize(),
					width: '100%',
					position: 'relative',
				}}
			>
				<table
					className="min-w-full bg-white border border-gray-300 "
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						transform: `translateY(${items[0]?.start ?? 0}px)`,
					}}
				>
					<thead className="bg-gray-200">
						<tr className="flex gap-1">
							{Object.keys(rows[0] || {}).map(key => (
								<th className="p-2 border-b flex-none w-44" key={`${key}-header`}>{key}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{items.map((virtualRow) => {
							const row = rows[virtualRow.index];

							return (
								<MemoRow key={`${row.id}-row`} rowData={row} onUpdate={updateRowData} />
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TableVirtualized;
