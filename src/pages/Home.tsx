import { useState, useEffect } from 'react';
import sampleData from '../assets/json-data.json';
import { JSONDataType } from '../types';
import JSONEditor from '../components/JSONEditor';

function Home() {
	const [data, setData] = useState<JSONDataType[]>([]);

	useEffect(() => {
		// Load data
		setData(sampleData);
	}, []);

	return (
		<div className="container mx-auto p-4">
			<JSONEditor data={data} />
		</div>
	);
}

export default Home;
