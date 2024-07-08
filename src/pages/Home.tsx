import { MemoTable } from '../components/Table.tsx';
import mockedData from '../assets/json-data.json'; // 1000 entities
// import mockedData from '../assets/big-data.json'; // 10 000 entities
// import mockedData from '../assets/ultra-big-data.json'; // 100 000 entities

function Home() {
	return (
		<MemoTable data={mockedData} itemHeight={80} containerHeight={window.innerHeight} overscan={10} />
	);
}

export default Home;
