import { MemoRow } from './Row.tsx';
import { DataValueType, DataType, DataKeyType } from '../types';
import { useCallback, useState, UIEvent } from 'react';
import { Filter } from './Filter.tsx';

interface EditorProps {
    data: DataType[];
    itemHeight: number;
    containerHeight: number;
    overscan: number;
}

function TableVirtualized({
	data, itemHeight, containerHeight, overscan,
}: EditorProps) {
	const [rows, setRows] = useState(() => data);
	const [filteredRows, setFilteredRows] = useState(() => data);
	const [scrollTop, setScrollTop] = useState(0);

	const updateRowData = useCallback((id: string, key: DataKeyType, value: DataValueType) => {
		setRows(oldData => (oldData.map(row =>
			(row.id === id ? { ...row, [key]: value } : row))));
	}, [setRows]);

	const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overscan, 0);
	const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight), filteredRows.length);

	const visibleItems = filteredRows.slice(startIndex, endIndex);
	const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * itemHeight;
	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		setScrollTop(event.currentTarget.scrollTop);
	};

	return (
		<div
			style={{ height: `${containerHeight}px`, overflowY: 'scroll' }}
			onScroll={handleScroll}
		>
			<div style={{ height: `${filteredRows.length * itemHeight}px` }}>
				<Filter data={rows} setData={setFilteredRows} />
				<table
					className="min-w-full bg-white border border-gray-300 "
				>
					<thead className="bg-gray-200">
						<tr className="flex gap-1">
							{Object.keys(rows[0] || {}).map(key => (
								<th className="p-2 border-b flex-none w-44" key={`${key}-header`}>{key}</th>
							))}
						</tr>
					</thead>
					<tbody
						style={{
							position: 'relative',
							height: `${visibleItems.length * itemHeight}px`,
							top: `${startIndex * itemHeight}px`,
						}}
					>
						{
							visibleItems.map(virtualRow => (
								<MemoRow key={`${virtualRow.id}-row`} rowData={virtualRow} onUpdate={updateRowData} />
							))
						}
					</tbody>
					<tfoot style={{ height: `${invisibleItemsHeight}px` }} />
				</table>
			</div>
		</div>
	);
}

export default TableVirtualized;
