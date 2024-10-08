import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Importa os estilos globais
import Sidebar from './Sidebar'; // Importa o componente Sidebar

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar /> {/* Sidebar presente em todas as páginas */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Orcamentos" element={<Orcamentos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Home = () => <h1>Página Inicial</h1>;
const Clientes = () => <h1>Pagina Clientes</h1>;
const Orcamentos = () => <h1>Pagina Orçamentos</h1>;

export default App;
