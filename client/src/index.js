import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import PrinterStore from "./store/PrinterStore";

const root = createRoot(document.getElementById('root'));

export const Context = createContext(null)

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        printer: new PrinterStore(),
    }}>
        <App />
    </Context.Provider>,
);

