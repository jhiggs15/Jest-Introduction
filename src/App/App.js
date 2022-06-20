import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from '../logo.svg';
import { Screen0 } from '../Screen0/Screen0';
import { Screen1 } from '../Screen1/Screen1';
import { Screen2 } from '../Screen2/Screen2';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path="/" element={<Screen0 />}/>
            <Route path="/1" element={<Screen1 />}/>
            <Route path="/2" element={<Screen2 />} />
          </Routes>
        </header>
      </Router>

    </div>
  );
}

export default App;
