import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);