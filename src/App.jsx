import { ServiceCard, WorkerCard, SearchInput, Footer } from './components';
import iServiceLottie from './assets/iservice-lottie.json';
import LottieAnimacao from 'lottie-react';
import { Home } from './pages';

function App() {
  return (
    <div
      style={{
        height: '300vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <SearchInput />
      <WorkerCard />
      <ServiceCard />
      {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      {/* <LottieAnimacao animationData={iServiceLottie} /> */}
      <Footer />
    </div>
  );
}

export default App;
