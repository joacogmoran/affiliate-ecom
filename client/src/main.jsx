import React from 'react'
import axios from 'axios';

// routing
import {createRoot} from 'react-dom/client';

// componetns
import App from './App';

// style
import './main.css';

// axios
axios.defaults.baseURL = `http://localhost:3001`;
axios.defaults.withCredentials = true;

// code
const root = document.getElementById('root');
const render = (<App/>);
createRoot(root).render(render);
