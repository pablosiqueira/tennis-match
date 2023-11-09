import './App.css';
import FooterInfo from './components/Footer/FooterInfo';
import TopBar from './components/Header/TopBar';
import Main from './components/Main/Main';

function App() {
  return (
    <>
    <div className="App" style={{backgroundImage:'./court.jpg'}}>
    <TopBar />
      <Main />  
    </div>
    <FooterInfo />
    </>
  );
}

export default App;
