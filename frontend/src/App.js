import {Route , Routes} from 'react-router-dom'
import './App.css';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  return (
    <div className="App"> 
      <Routes>
<Route path='/' Component={Home} />
<Route path='/chat' Component={Chat} />

      </Routes>
      
    </div>
  );
}

export default App;
