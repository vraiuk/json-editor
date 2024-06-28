import Table from '../components/Table.tsx';
import mockedData from '../assets/json-data.json'; // 1000 entities
// import mockedData from '../assets/big-data.json'; // 10 000 entities
// import mockedData from '../assets/ultra-big-data.json'; // 100 000 entities

function Home() {
	return (
		<div className="mx-4 p-4">
			<Table data={mockedData} />
		</div>
	);
}

export default Home;