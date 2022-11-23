import { RecoilRoot } from 'recoil';
import './App.css';
import LogList from './components/LogList';
import Header from './components/ui/Header';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header/>
        <LogList/>
      </div>
    </RecoilRoot>
  );
}

export default App;
