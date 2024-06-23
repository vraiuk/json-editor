import JSONRow from './JSONRow';
import { JSONDataType } from '../types';

interface JSONEditorProps {
    data: JSONDataType[];
}

function JSONEditor({ data }: JSONEditorProps) {
	return (
		<div>
			{data.map(record => (
				<JSONRow key={record.id} data={record} />
			))}
		</div>
	);
}

export default JSONEditor;
