import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store"
import { DataTable } from './students';
import { users } from './Data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const COLUMNS=[
"First Name",
"Last Name",
"Email",
"Avatar"]

// let first_name=Array.from(new Set(users.map(user=>user.first_name)));
// let last_name=Array.from(new Set(users.map(user=>user.last_name)));
// let email=Array.from(new Set(users.map(user=>user.email)));
// let avatar=Array.from(new Set(users.map(user=>user.avatar)))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <DataTable
    columns={COLUMNS}
    data={users}
    />
  </React.StrictMode>
);

reportWebVitals();
