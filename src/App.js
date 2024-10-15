import React, { useState, useEffect } from 'react'; // Importe useState e useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Importa os estilos globais
import Sidebar from './Sidebar'; // Importa o componente Sidebar
import Clientes from './components/Clientes/Clientes';
import BotaoDarkMode from './components/Botoes/DarkMode/botaodarkmode';



function App() {
   // Estado para armazenar o tema atual
   const [theme, setTheme] = useState('light');

   // Função para alternar o tema
   const toggleDarkMode = () => {
     const newTheme = theme === 'light' ? 'dark' : 'light';
     setTheme(newTheme);
     // Define o atributo data-theme no elemento root (html)
     document.documentElement.setAttribute('data-theme', newTheme);
   };
 
   // Persistir a escolha do tema no localStorage
   useEffect(() => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme) {
       setTheme(savedTheme);
       document.documentElement.setAttribute('data-theme', savedTheme);
     }
   }, []); // Executa apenas uma vez quando o componente é montado
 
   // Atualizar o localStorage sempre que o tema mudar
   useEffect(() => {
     localStorage.setItem('theme', theme);
     document.documentElement.setAttribute('data-theme', theme); // Mova isso aqui
   }, [theme]); // Inclua 'theme' nas dependências

  return (
    <Router>
      <div className="App">
      <header>
    <div>
    <BotaoDarkMode toggleDarkMode={toggleDarkMode} />
    </div>
</header>
          
          

       

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
