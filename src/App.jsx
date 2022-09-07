import React, { useRef } from 'react';
import './App.css';
import { ServiceCard, WorkerCard } from './components';
import iServiceLottie from './assets/iservice-lottie.json';
import LottieAnimacao from 'lottie-react';

function App() {
	return (
		<div className="App">
			{/* <WorkerCard /> */}
			{/* <ServiceCard /> */}
			<lottie-interactive path="https://assets2.lottiefiles.com/packages/lf20_i9mxcD.json" interaction="hover" />
			<LottieAnimacao animationData={iServiceLottie} />
		</div>
	);
}

export default App;
