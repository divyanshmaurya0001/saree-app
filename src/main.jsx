import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #FFF8F0;
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
  }

  a {
    text-decoration: none;
  }

  button {
    font-family: 'Poppins', sans-serif;
    transition: all 0.2s ease;
  }

  button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  input, textarea, select {
    font-family: 'Poppins', sans-serif;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #8B0000 !important;
    box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #8B0000;
    border-radius: 4px;
  }

  img {
    transition: transform 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);