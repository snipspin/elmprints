import React from 'react'
import logo from './logo.svg'
import {BrowserRouter} from 'react-router-dom'

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import './App.css'
import './css/style.css'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
