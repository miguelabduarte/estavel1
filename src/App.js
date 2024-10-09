import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Importa os estilos globais
import Sidebar from './Sidebar'; // Importa o componente Sidebar
import Clientes from './components/Clientes';

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
            <Route path="/Obras" element={<Obras />} /> 
            <Route path="/Financas" element={<Financas />} /> 
            <Route path="/Inventario" element={<Inventario />} /> 
            <Route path="/Estatisticas" element={<Estatisticas />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Componentes simples para cada nova rota
const Home = () => <h1>Página Inicial</h1>;
const Orcamentos = () => <h1>Página Orçamentos</h1>;
const Obras = () => <h1>Página Obras</h1>; 
const Financas = () => <h1>Página Finanças</h1>; 
const Inventario = () => <h1>Página Inventário</h1>; 
const Estatisticas = () => <h1>Página Estatísticas</h1>; 

export default App; 
