import styled from 'styled-components';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Home from './pages/Home';
import "./App.css"

const AppContainer = styled.div`
  background-color: #14161a;
  
  color: white;

`;

function App() {
  return (
    <AppContainer className='app'>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
