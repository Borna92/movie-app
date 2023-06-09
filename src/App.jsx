import { useState } from 'react';
import './App.css';
import Header from './Header';
import Movies from './Movies';
import Footer from './footer';

function App() {
  return (
    <>
      <Header />
      <Movies />
      <Footer />
    </>
  );
}

export default App;
