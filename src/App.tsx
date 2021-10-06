import Home from './pages/Home';
import { hot as HotLoader } from 'react-hot-loader/root';
import './App.css';

function App() {
	return (
		<div className="App">
			<Home />
		</div>
	);
}

export default HotLoader(App);
