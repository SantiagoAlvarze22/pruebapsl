import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = 'http://localhost:4000';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
