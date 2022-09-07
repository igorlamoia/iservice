import React, { useRef } from 'react';
import './App.css';
import { ServiceCard, WorkerCard, SearchInput } from './components';
import iServiceLottie from './assets/iservice-lottie.json';
import LottieAnimacao from 'lottie-react';
import { Home } from './screens';

function App() {
	return (
		<div className="App">
			<SearchInput />
			{/* <WorkerCard />
			<ServiceCard /> */}
			{/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
			{/* <LottieAnimacao animationData={iServiceLottie} /> */}
		</div>
	);
}

export default App;
