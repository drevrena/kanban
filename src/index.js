import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';
import { BoardContextProvider } from './context/BoardContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <BoardContextProvider>
            <App />
        </BoardContextProvider>
    </UserContextProvider>
);

