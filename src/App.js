import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateInstitue from './Component/CreateInstitute'
import Register from './Component/Register'
import PayFees from './Component/PayFees'
import CheckStatus from './Component/CheckStatus'

function App() {
  return (
    <div className="App">
      <CreateInstitue/>
      <Register/>
      <h3>PayFees</h3>
      <PayFees/>
      <h3>Check status</h3>
      <CheckStatus/>

    </div>
  );
}

export default App;
